export interface LifeState {
  currentLives: number;
  maxLives: number;
  lostLivesCount: number;
}

export class LifeSystem {
  private state: LifeState;

  constructor(maxLives: number = 3) {
    this.state = {
      currentLives: maxLives,
      maxLives,
      lostLivesCount: 0,
    };
  }

  public getLives(): number {
    return this.state.currentLives;
  }

  public getMaxLives(): number {
    return this.state.maxLives;
  }

  public isAlive(): boolean {
    return this.state.currentLives > 0;
  }

  public isFlawless(): boolean {
    return this.state.lostLivesCount === 0;
  }

  /**
   * Deducts 1 life. Returns remaining lives.
   */
  public deductLife(): number {
    if (this.state.currentLives > 0) {
      this.state.currentLives -= 1;
      this.state.lostLivesCount += 1;
    }
    return this.state.currentLives;
  }

  public reset(maxLives: number = 3): void {
    this.state = {
      currentLives: maxLives,
      maxLives,
      lostLivesCount: 0,
    };
  }

  public calculateLifeBonus(): number {
    if (this.state.currentLives >= 3) return 150;
    if (this.state.currentLives === 2) return 75;
    if (this.state.currentLives === 1) return 25;
    return 0;
  }
}
