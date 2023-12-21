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
            new StationClasse("CHU - Centre O. Lambret", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Porte des Postes", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Wazemmes", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Gambetta", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("République Beaux-Arts", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Rihour", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Gare Lille Flandres", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Caulier", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Fives", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Marbrerie", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Mairie d'Hellemmes", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Square Flandres", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Pont de Bois", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Villeneuve d'Ascq Hôtel de Ville", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Triolo", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Cité Scientifique Pr Gabillard", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Villeneuve d'Ascq 4 Cantons Stade Pierre Mauroy", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
        ];


        this.metroLine2A = [
            new StationClasse("Saint-Philibert", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 80, 1),
            ]),
            new StationClasse("Bourg", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Maison des Enfants", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Pont Supérieur", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Lomme Lambersart", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Canteleu", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Bois Blancs", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Port de Lille", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Cormontaigne", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Montebello", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Porte des Postes", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Porte d'Arras", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Porte de Douai", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Porte de Valenciennes", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Lille Grand Palais", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Mairie de Lille", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Gare Lille Flandres", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Gare Lille Europe", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Saint-Maurice Pellevoisin", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
            new StationClasse("Mons Sarts", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 100, 1),
            ]),
        ];


        this.metroLine2B = [
            new StationClasse("Mairie de Mons", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 85, 90, 0),
            ]),
            new StationClasse("Fort de Mons", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 90, 90, 1),
            ]),
            new StationClasse("Les Prés Edgard Pisani", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 88, 90, 1),
            ]),
            new StationClasse("Jean Jaurès", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 92, 90, 1),
            ]),
            new StationClasse("Wasquehal Hôtel de Ville", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 93, 90, 1),
            ]),
            new StationClasse("Wasquehal Pavé de Lille", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 94, 90, 1),
            ]),
            new StationClasse("Croix - Centre", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 96, 90, 1),
            ]),
            new StationClasse("Epeule - Montesquieu", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 97, 90, 1),
            ]),
            new StationClasse("Roubaix Grand Place", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 98, 90, 1),
            ]),
            new StationClasse("Eurotéléport", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 99, 90, 1),
            ]),
            new StationClasse("Roubaix Charles de Gaulle", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 90, 1),
            ]),
            new StationClasse("Alsace", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 90, 90, 1),
            ]),
            new StationClasse("Mercure", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 92, 90, 1),
            ]),
            new StationClasse("Carliers", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 94, 90, 1),
            ]),
            new StationClasse("Gare de Tourcoing", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 96, 90, 1),
            ]),
            new StationClasse("Tourcoing Centre", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 98, 90, 1),
            ]),
            new StationClasse("Colbert", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 99, 90, 1),
            ]),
            new StationClasse("Phalempins", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 95, 90, 1),
            ]),
            new StationClasse("Pont de Neuville", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 90, 90, 1),
            ]),
            new StationClasse("Tourcoing Sébastopol", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 92, 90, 1),
            ]),
            new StationClasse("Tourcoing C.H. Dron", [
                new BorneClasse(1, 100, 100, 1),
                new BorneClasse(2, 94, 80, 1),
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

    public resetInkLevelForBorne(borne: BorneClasse) {
        borne.resetLevels(100);
        this.saveDataToLocalStorage();
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