let score = 0;

export function getScore(): number {
  return score;
}

export function increaseScore(amount: number): void {
  score += amount;
}
