export class BorneClasse {
    id: number;
    ink_level: number;
    paper_level: number;

    constructor(id: number, ink_level: number, paper_level: number) {
        this.id = id;
        this.ink_level = ink_level;
        this.paper_level = paper_level;
    }

    decrementLevels(inkDecrement: number, paperDecrement: number) {
        this.ink_level = Math.max(this.ink_level - inkDecrement, 0);
        this.paper_level = Math.max(this.paper_level - paperDecrement, 0);
    }

    resetInkLevels(inkResetValue: number) {
        this.ink_level = inkResetValue;
    }

    resetPaperLevels(paperResetValue: number) {
        this.paper_level = paperResetValue;
    }
}