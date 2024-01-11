import { BorneClasse } from "./borne.classe";

export class StationClasse {
  agent?: { name: string, photoUrl: string };
  
  constructor(public name: string, public bornes: BorneClasse[]) {}
}
