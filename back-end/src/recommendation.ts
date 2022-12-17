export class Recommendation {
  sport!: string;
  score!: number;

  constructor(sport: string, score: number) {
    this.sport = sport;
    this.score = score;
  }
}
