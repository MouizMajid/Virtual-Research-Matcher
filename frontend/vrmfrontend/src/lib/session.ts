// Carries "your session expired, go back to where you were" across the CAS sign-in.
// sessionStorage survives the redirects because they all happen in the same browser tab.
const EXPIRED_KEY = "vrmm:session-expired";
const RETURN_PATH_KEY = "vrmm:return-path";

export function markSessionExpired(returnPath?: string) {
  try {
    sessionStorage.setItem(EXPIRED_KEY, "true");
    if (returnPath) {
      sessionStorage.setItem(RETURN_PATH_KEY, returnPath);
    }
  } catch {
    // Storage can be blocked. The user just misses the notice and the return trip.
  }
}

export function wasSessionExpired(): boolean {
  try {
    return sessionStorage.getItem(EXPIRED_KEY) === "true";
  } catch {
    return false;
  }
}

export function clearSessionExpiredNotice() {
  try {
    sessionStorage.removeItem(EXPIRED_KEY);
  } catch {
    // Nothing to clean up if storage is blocked.
  }
}

// Returns the page to go back to after sign-in, and forgets it so it's only used once.
export function takeReturnPath(): string | null {
  try {
    const path = sessionStorage.getItem(RETURN_PATH_KEY);
    sessionStorage.removeItem(RETURN_PATH_KEY);
    // Only ever a path inside this app, never another site.
    return path && path.startsWith("/") && !path.startsWith("//") ? path : null;
  } catch {
    return null;
  }
}
