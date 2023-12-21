import { Injectable } from '@angular/core';
import { LocalStorageService} from "./localstorage.service";
import { BorneClasse } from '../classes/borne.classe';
import { StationClasse } from '../classes/station.classe';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    metroLine1: StationClasse[] = [];
    metroLine2A: StationClasse[] = [];
    metroLine2B: StationClasse[] = [];

    constructor(private localStorageService: LocalStorageService) {
        // Execute the function every 2 seconds
        setInterval(() => {
            this.decrementBorneLevels();
            this.saveDataToLocalStorage();
        }, 1000);
    }

    public initializeData() {
        this.metroLine1 = [
            new StationClasse("Lille CHU-Eurasanté", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Gare Lille Flandres", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
                new BorneClasse(3, 100, 90, 1),
                new BorneClasse(4, 100, 100, 0),
            ]),
        ];

        this.metroLine2A = [
            new StationClasse("Saint-Philibert", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 80, 1),
            ]),
            new StationClasse("Gare Lille Flandres", [
                new BorneClasse(5, 100, 100, 1),
                new BorneClasse(6, 90, 100, 1),
            ]),
        ];

        this.metroLine2B = [
            new StationClasse("Mairie de Mons", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 85, 90, 0),
            ]),
            new StationClasse("Tourcoing C.H. Dron", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 80, 80, 1),
            ]),
        ];
    }

    public getStationData(stationName: string): any {
        const allStations = [...this.metroLine1, ...this.metroLine2A, ...this.metroLine2B];
        const selectedStation = allStations.find(station => station.name === stationName);
        return selectedStation;
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

    public resetInkLevels() {
        this.resetLevelsForLine(this.metroLine1);
        this.resetLevelsForLine(this.metroLine2A);
        this.resetLevelsForLine(this.metroLine2B);
        this.saveDataToLocalStorage(); // Sauvegarder les données après la réinitialisation
    }

    private resetLevelsForLine(line: StationClasse[]) {
        line.forEach(station => {
            station.bornes.forEach(borne => borne.resetLevels(100));
        });
    }

    private saveDataToLocalStorage() {
        const metroLines = {
            metroLine1: this.metroLine1,
            metroLine2A: this.metroLine2A,
            metroLine2B: this.metroLine2B,
        };

        this.localStorageService.saveData("metroLinesData", metroLines);
    }
}