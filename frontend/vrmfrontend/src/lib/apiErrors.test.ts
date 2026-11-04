import { AxiosError, type AxiosResponse } from "axios";
import { describe, expect, it } from "vitest";
import { getApiErrorMessage, isSessionExpiredError } from "./apiErrors";

function errorWith(status: number, data: unknown) {
  return new AxiosError("Request failed", undefined, undefined, undefined, { status, data } as AxiosResponse);
}

describe("getApiErrorMessage", () => {
  it("shows the backend's message", () => {
    expect(getApiErrorMessage(errorWith(400, { message: "Title must be 255 characters or fewer" }))).toBe(
      "Title must be 255 characters or fewer",
    );
  });

  it("explains when the server can't be reached", () => {
    expect(getApiErrorMessage(new AxiosError("Network Error"))).toContain("couldn't reach the server");
  });

  it("explains Nginx errors, which have no JSON message", () => {
    expect(getApiErrorMessage(errorWith(502, "<html>Bad Gateway</html>"))).toContain("temporarily unavailable");
    expect(getApiErrorMessage(errorWith(413, "<html>Too Large</html>"))).toContain("too much text");
  });

  it("never shows raw HTML or an empty message", () => {
    expect(getApiErrorMessage(errorWith(500, "<html>Error</html>"))).toBe("Something went wrong. Please try again.");
    expect(getApiErrorMessage(errorWith(500, { message: "" }))).toBe("Something went wrong. Please try again.");
  });

  it("handles errors that aren't from a request", () => {
    expect(getApiErrorMessage(new Error("boom"))).toBe("Something went wrong. Please try again.");
  });
});

describe("isSessionExpiredError", () => {
  it("is only true for a 401", () => {
    expect(isSessionExpiredError(errorWith(401, {}))).toBe(true);
    expect(isSessionExpiredError(errorWith(403, {}))).toBe(false);
    expect(isSessionExpiredError(new Error("boom"))).toBe(false);
  });
});
