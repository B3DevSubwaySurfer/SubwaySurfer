import { Component, OnInit } from '@angular/core';
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
  stations: StationClasse[] = [];
  metroLines: { [key: string]: StationClasse[] } = {};
  
  ngOnInit() {
    this.schedulePopup();
    this.appService.getStations().then(stations => {
      this.stations = stations;
      this.groupStationsByLine();
      console.log(stations);
    });
  }

  groupStationsByLine() {
    for (let station of this.stations) {
      const lineName = station.metroLine.name;
      if (!this.metroLines[lineName]) {
        this.metroLines[lineName] = [];
      }
      this.metroLines[lineName].push(station);
    }
  }

  agents = [
    { name: 'Vianney', photoUrl: 'url-to-agent-1-photo', status: 'Disponible' },
    { name: 'Thibaut', photoUrl: 'url-to-agent-2-photo', status: 'Disponible' },
    { name: 'Théotime', photoUrl: 'url-to-agent-3-photo', status: 'Disponible' },
    { name: 'Baptiste', photoUrl: 'url-to-agent-4-photo', status: 'Disponible' },
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
    // const stationBornes = this.bornes.filter(borne => borne.station_id === station.id);
    return 'normal';
  
    // if (stationBornes.length === 0) {
    //   console.error('Station has no bornes:', station);
    //   return 'normal';
    // }
  
    // const inkLevels = stationBornes.map(borne => borne.level).filter(Number.isFinite);
  
    // if (inkLevels.length === 0) {
    //   console.error('Station has no valid ink levels:', station);
    //   return 'normal';
    // }
  
    // const lowestInkLevel = Math.min(...inkLevels);
  
    // if (lowestInkLevel <= 10) {
    //   return 'critical';
    // } else if (lowestInkLevel <= 50) {
    //   return 'medium';
    // } else {
    //   return 'normal';
    // }
  }

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  showPopup = false;
  popupInterval: any;

  showProblemPopup() {
    this.showPopup = true;
  }
  
  schedulePopup() {
    // Generate a random time between 1 and 5 minutes
    const time = Math.random() * (5 - 1) + 1; // time in minutes
    // const timeInMs = time * 1000; // convert time to milliseconds
    const timeInMs = time * 60 * 1000; // convert time to milliseconds
  
    this.popupInterval = setTimeout(() => {
      this.showProblemPopup();
      this.schedulePopup(); // schedule the next popup
    }, timeInMs);
  }

  ngOnDestroy() {
    if (this.popupInterval) {
      clearTimeout(this.popupInterval);
    }
  }
}
