import axios from "axios";

// Backend errors all look like {"message": "..."} (see GlobalExceptionHandler.java).
// This turns any failed request into a sentence that's safe to show the user.
export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong. Please try again.";
  }

  // No response at all: the request never reached the server.
  if (!error.response) {
    return "We couldn't reach the server. Please check your connection and try again.";
  }

  const message = (error.response.data as { message?: unknown } | undefined)?.message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  // These come from Nginx rather than the backend, so they have no JSON message.
  const { status } = error.response;
  if (status === 413) {
    return "That's too much text to submit at once. Please shorten it and try again.";
  }
  if (status >= 502 && status <= 504) {
    return "VRMM is temporarily unavailable. Please try again in a minute.";
  }
  return "Something went wrong. Please try again.";
}

export function isSessionExpiredError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}
