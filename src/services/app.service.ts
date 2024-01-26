import { Injectable } from '@angular/core';
import { BorneClasse } from '../classes/borne.classe';
import { StationClasse } from '../classes/station.classe';
import { MetroLineClasse } from '../classes/metroLine.classe';
import { invoke } from '@tauri-apps/api/tauri'

interface StationData {
  id: number;
  name: string;
  metro_line: MetroLineData; // Add this line
  bornes: any[]; // Replace `any` with the actual type of `bornes` if known
}

interface BorneData {
  id: number;
  station_id: number;
  level: number;
  max_level: number;
}

interface MetroLineData {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {

  metroLine1: StationClasse[] = [];
  metroLine2A: StationClasse[] = [];
  metroLine2B: StationClasse[] = [];
  bornes: BorneClasse[] = [];

  private selectedBornes: BorneClasse[] = [];

  constructor() {
    // Execute the function every 5 seconds
    setInterval(() => {
      this.decrementBorneLevels();
    }, 5000);
  }


  getAllStations() {
    return [...this.metroLine1, ...this.metroLine2A, ...this.metroLine2B];
  }

  getStations(): Promise<StationClasse[]> {
    return invoke<StationData[]>('get_stations')
      .then(data => {
        return data.map((station: StationData) => new StationClasse(station.id, station.name, new MetroLineClasse(station.metro_line.id, station.metro_line.name), station.bornes));
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  }

  public getBornes(): Promise<BorneClasse[]> {
    if (this.bornes.length === 0) {
      // Si les bornes n'ont pas encore été chargées, chargez-les
      return invoke<BorneData[]>('get_bornes')
        .then(data => {
          this.bornes = data.map((borne: BorneData) => new BorneClasse(borne.id, borne.station_id, borne.level, borne.max_level));
          return this.bornes;
        })
        .catch(error => {
          console.error(error);
          return [];
        });
    } else {
      // Si les bornes ont déjà été chargées, retournez-les
      return Promise.resolve(this.bornes);
    }
  }

  setSelectedBornes(bornes: BorneClasse[]): void {
    this.selectedBornes = bornes;
  }

  getSelectedBornes(): BorneClasse[] {
    return this.selectedBornes;
  }

  private decrementBorneLevels() {
    this.decrementForLine(this.metroLine1);
    this.decrementForLine(this.metroLine2A);
    this.decrementForLine(this.metroLine2B);
  }

  private decrementForLine(line: StationClasse[]) {
    line.forEach(station => {
      const inkDecrement = Math.floor(Math.random() * 10) + 1;
      const paperDecrement = Math.floor(Math.random() * 10) + 1;

      station.bornes.forEach(borne => borne.decrementLevels(inkDecrement, paperDecrement));
    });
  }

  public resetInkLevelForBorne(borne: BorneClasse) {
    borne.resetLevels(100);
    this.saveDataToLocalStorage();
  }

  public resetPaperLevelForBorne(borne: BorneClasse) {
    borne.resetMaxLevels(100);
    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    const metroLines = {
      metroLine1: this.metroLine1,
      metroLine2A: this.metroLine2A,
      metroLine2B: this.metroLine2B,
    };
  }
}