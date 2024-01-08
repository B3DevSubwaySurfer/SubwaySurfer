import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../../../services/app.service";
import { StationClasse} from "../../../classes/station.classe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  showAgents = 'hidden';

  constructor(public appService: AppService, private router: Router) {}

  getStationPosition(index: number, arrayLength: number): string {
    return (index / (arrayLength - 1)) * 100 + '%';
  }

  onSelectStation(station: StationClasse): void {
    this.router.navigate(['/preview'], { queryParams: { stationName: station.name } });
  }
  getStationInkStatus(station: StationClasse): string {
    const lowestInkLevel = Math.min(...station.bornes.map(b => b.ink_level));

    if (lowestInkLevel <= 10) {
      return 'critical';
    } else if (lowestInkLevel <= 50) {
      return 'medium';
    } else {
      return 'normal';
    }
  }

  toggleAgents() {
    this.showAgents = this.showAgents === 'hidden' ? 'visible' : 'hidden';
  }
}
