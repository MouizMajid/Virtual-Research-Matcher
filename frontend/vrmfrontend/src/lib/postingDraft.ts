// Protects a posting someone just spent an hour writing. The draft is saved right before
// submitting and thrown away unless the failure was an expired session, so it comes back
// after they sign in again. It's per-tab (sessionStorage) and per-user, so it can't
// reappear for someone else signing in later on a shared computer.
export interface PostingDraft<Values> {
  values: Values;
  tags: string[];
}

export function postingDraftKey(userId: string | undefined, postingId?: string) {
  return `vrmm:posting-draft:${userId ?? "unknown"}:${postingId ?? "new"}`;
}

export function savePostingDraft<Values>(key: string, draft: PostingDraft<Values>) {
  try {
    sessionStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // Storage can be blocked or full. Submitting still works, there's just no safety net.
  }
}

export function loadPostingDraft<Values>(key: string): PostingDraft<Values> | null {
  try {
    const saved = sessionStorage.getItem(key);
    return saved ? (JSON.parse(saved) as PostingDraft<Values>) : null;
  } catch {
    return null;
  }
}

export function clearPostingDraft(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage is blocked.
  }
}
