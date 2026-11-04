// Keep in sync with the @Size limits in backend CreatePostingDto.java.
// The form checks these so people see the problem before submitting. It deliberately
// doesn't use the HTML maxLength attribute, which would silently cut off pasted text.
export const POSTING_LIMITS = {
  title: 255,
  description: 20000,
  duration: 255,
  requirements: 20000,
  tagLength: 100,
  tagCount: 30,
};
