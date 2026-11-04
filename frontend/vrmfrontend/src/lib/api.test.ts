// @vitest-environment jsdom
import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "./api";
import { takeReturnPath, wasSessionExpired } from "./session";

// Runs the real interceptors, with the network replaced by a fixed 401.
function respondWith401() {
  api.defaults.adapter = (config: InternalAxiosRequestConfig) =>
    Promise.reject(
      new AxiosError("Unauthorized", "ERR_BAD_REQUEST", config, null, {
        status: 401,
        data: { message: "Your session has expired. Please sign in again." },
      } as AxiosResponse),
    );
}

describe("api 401 handling", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.history.pushState({}, "", "/dashboard/create-posting");
    // jsdom can't navigate and reports it as an error. The redirect itself isn't under test.
    vi.spyOn(console, "error").mockImplementation(() => {});
    respondWith401();
  });

  it("signs out and remembers the page when a logged-in request gets a 401", async () => {
    localStorage.setItem("token", "expired-token");

    await expect(api.post("/postings", {})).rejects.toThrow();

    expect(localStorage.getItem("token")).toBeNull();
    expect(wasSessionExpired()).toBe(true);
    expect(takeReturnPath()).toBe("/dashboard/create-posting");
  });

  it("leaves a logged-out visitor alone", async () => {
    await expect(api.get("/applications/my")).rejects.toThrow();

    expect(wasSessionExpired()).toBe(false);
    expect(takeReturnPath()).toBeNull();
  });
});

describe("takeReturnPath", () => {
  it("only returns a path inside the app, and only once", () => {
    sessionStorage.setItem("vrmm:return-path", "/dashboard/my-postings");
    expect(takeReturnPath()).toBe("/dashboard/my-postings");
    expect(takeReturnPath()).toBeNull();

    sessionStorage.setItem("vrmm:return-path", "//evil.example.com");
    expect(takeReturnPath()).toBeNull();

    sessionStorage.setItem("vrmm:return-path", "https://evil.example.com");
    expect(takeReturnPath()).toBeNull();
  });
});
