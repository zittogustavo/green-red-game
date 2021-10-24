export class UserData {
    name: string = '';
    score: number;
    maxScore: number;
    constructor(name: string, score: number = 0, maxScore: number = 0) {
        this.name = name;
        this.score = score;
        this.maxScore = maxScore
    }
}