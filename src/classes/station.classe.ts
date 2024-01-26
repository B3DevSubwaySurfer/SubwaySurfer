import { BorneClasse } from "./borne.classe";
import { MetroLineClasse } from "./metroLine.classe";

export class StationClasse {
  agent?: { name: string, photoUrl: string };
  
  constructor(public id: number, public name: string, public metroLine: MetroLineClasse, public bornes: BorneClasse[]) {}
}
