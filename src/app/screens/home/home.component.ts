import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../../../services/app.service";
import { StationClasse } from "../../../classes/station.classe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  showAgents = 'hidden';

  agents = [
    { name: 'Vianney', photoUrl: 'url-to-agent-1-photo' },
    { name: 'Thibaut', photoUrl: 'url-to-agent-2-photo' },
    { name: 'Théotime', photoUrl: 'url-to-agent-3-photo' },
    { name: 'Baptiste', photoUrl: 'url-to-agent-3-photo' },
  ];

  selectedAgent: { name: string, photoUrl: string } | null; 

  constructor(public appService: AppService, private router: Router) {
    this.selectedAgent = null; 
  }

  onSelectAgent(agent: { name: string, photoUrl: string }) {
    this.selectedAgent = agent;
    this.showAgents = 'visible';
  }

  selectedStation: string | null = null;  // Déclaration de la propriété

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
