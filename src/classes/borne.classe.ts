export class BorneClasse {
    constructor(public id: number, public station_id: number, public level: number, public max_level: number) {}
  
    decrementLevels(inkDecrement: number, paperDecrement: number) {
        this.level = Math.max(this.level - inkDecrement, 0);
        this.max_level = Math.max(this.max_level - paperDecrement, 0);
    }
  
    resetLevels(resetValue: number) {
      this.level = resetValue;
    }
  
    resetMaxLevels(resetValue: number) {
      this.max_level = resetValue;
    }
  }