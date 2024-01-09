import { BorneClasse} from "./borne.classe";

export class StationClasse {
    constructor(public name: string, public bornes: BorneClasse[]) {}
}
