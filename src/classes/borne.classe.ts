export class BorneClasse {
    constructor(public id: number, public ink_level: number, public paper_level: number) {}

    decrementLevels(inkDecrement: number, paperDecrement: number) {
        this.ink_level = Math.max(this.ink_level - inkDecrement, 0);
        this.paper_level = Math.max(this.paper_level - paperDecrement, 0);
    }

    resetLevels(inkResetValue: number) {
        this.ink_level = inkResetValue;
    }
}
