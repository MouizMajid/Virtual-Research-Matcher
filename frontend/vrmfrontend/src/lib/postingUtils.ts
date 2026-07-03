export function isOpen(deadline: string): boolean {
  return new Date(deadline) >= new Date();
}
