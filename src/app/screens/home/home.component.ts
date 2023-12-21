import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localstorage.services';
import { StationClasse} from "../../../classes/station.classe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  metroLine1: StationClasse[] = [];
  metroLine2A: StationClasse[] = [];
  metroLine2B: StationClasse[] = [];

  ngOnInit() {
    this.getDataFromLocalStorage();
  }

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  private getDataFromLocalStorage() {
    const metroLines = this.localStorageService.getData('metroLinesData');

    if (metroLines) {
      this.metroLine1 = metroLines.metroLine1;
      this.metroLine2A = metroLines.metroLine2A;
      this.metroLine2B = metroLines.metroLine2B;
    }
  }

  getStationPosition(index: number, arrayLength: number): string {
    return (index / (arrayLength - 1)) * 100 + '%';
  }

  onSelectStation(station: StationClasse): void {
    this.router.navigate(['/preview'], { queryParams: { stationName: station.name } });
  }
}
