import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "../services/localstorage.services";
import { BorneClasse} from "../classes/borne.classe";
import { StationClasse} from "../classes/station.classe";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  metroLine1: StationClasse[] = [];
  metroLine2A: StationClasse[] = [];
  metroLine2B: StationClasse[] = [];

  ngOnInit() {
    this.initializeData();
  }

  constructor(private localStorageService: LocalStorageService) {
    // Execute the function every 2 seconds
    setInterval(() => {
      this.decrementBorneLevels();
      this.saveDataToLocalStorage();
    }, 1000);
  }

  private initializeData() {
    this.metroLine1 = [
      new StationClasse("Lille CHU-Eurasanté", [
        new BorneClasse(1, 200, 100, 1),
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

  private decrementBorneLevels() {
    const inkDecrement = 5;
    const paperDecrement = 3;

    this.metroLine1.forEach(station => station.bornes.forEach(borne => borne.decrementLevels(inkDecrement, paperDecrement)));
    this.metroLine2A.forEach(station => station.bornes.forEach(borne => borne.decrementLevels(inkDecrement, paperDecrement)));
    this.metroLine2B.forEach(station => station.bornes.forEach(borne => borne.decrementLevels(inkDecrement, paperDecrement)));
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
