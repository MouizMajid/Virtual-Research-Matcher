// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AxiosError, type AxiosResponse } from "axios";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../../lib/api";
import CreatePosting from "./CreatePosting";

vi.mock("../../../lib/api", () => ({ default: { post: vi.fn() } }));
vi.mock("../../../context/AuthContext", () => ({ useAuth: () => ({ user: { id: 42 } }) }));

const { toastError } = vi.hoisted(() => ({ toastError: vi.fn() }));
vi.mock("sonner", () => ({
  toast: { error: toastError, info: vi.fn(), success: vi.fn() },
}));

const DRAFT_KEY = "vrmm:posting-draft:42:new";
const post = vi.mocked(api.post);

function renderForm() {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <CreatePosting />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function change(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

// Fills in everything required. Compensation stays blank, like the professor's 4th post.
function fillRequiredFields(title = "BLOOM") {
  change(/project title/i, title);
  change(/posting type/i, "PROJECT");
  change(/description/i, "A long description he spent an hour writing");
  change(/open positions/i, "2");
  change(/application deadline/i, "2026-12-01");
  change(/location/i, "On-site");
}

function publish() {
  fireEvent.click(screen.getByRole("button", { name: /publish posting/i }));
}

function failWith(status: number, message: string) {
  post.mockRejectedValue(
    new AxiosError("Request failed", undefined, undefined, undefined, { status, data: { message } } as AxiosResponse),
  );
}

describe("CreatePosting", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });
  afterEach(cleanup);

  it("publishes with Compensation left blank", async () => {
    post.mockResolvedValue({ data: {} });
    renderForm();
    fillRequiredFields();
    publish();

    await waitFor(() => expect(post).toHaveBeenCalled());
    // A blank number box is NaN, which becomes null in JSON. The backend now accepts that.
    const body = post.mock.calls[0][1] as { stipend: number };
    expect(JSON.parse(JSON.stringify(body)).stipend).toBeNull();
    await waitFor(() => expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull());
  });

  it("shows the backend's real error message", async () => {
    failWith(400, "Title must be 255 characters or fewer");
    renderForm();
    fillRequiredFields();
    publish();

    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith("Failed to publish posting", {
        description: "Title must be 255 characters or fewer",
      }),
    );
    expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it("brings the post back after an expired session", async () => {
    failWith(401, "Your session has expired. Please sign in again.");
    renderForm();
    fillRequiredFields();
    fireEvent.change(screen.getByPlaceholderText(/type a tag/i), { target: { value: "3D printing" } });
    fireEvent.keyDown(screen.getByPlaceholderText(/type a tag/i), { key: "Enter" });
    publish();

    await waitFor(() => expect(sessionStorage.getItem(DRAFT_KEY)).not.toBeNull());

    // The user is sent to sign in, then returns to a freshly loaded page.
    cleanup();
    renderForm();

    expect((screen.getByLabelText(/project title/i) as HTMLInputElement).value).toBe("BLOOM");
    expect((screen.getByLabelText(/description/i) as HTMLTextAreaElement).value).toContain("spent an hour writing");
    expect(screen.getByText("3D printing")).toBeTruthy();
    expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it("stops an over-long title before it's sent, without cutting it off", async () => {
    const tooLong = "x".repeat(256);
    renderForm();
    fillRequiredFields(tooLong);
    publish();

    expect(await screen.findByText("Project title must be 255 characters or fewer")).toBeTruthy();
    expect(post).not.toHaveBeenCalled();
    expect((screen.getByLabelText(/project title/i) as HTMLInputElement).value).toBe(tooLong);
  });
});
