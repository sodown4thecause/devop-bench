export function trackVote(pinId: number, boardId: number): Record<string, number> {
  const sessionStart = Date.now();
  return { pinId, event: 1 };
}
