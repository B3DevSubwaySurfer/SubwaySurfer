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
  selectedAgent: { name: string, photoUrl: string } | null;
  selectedStation: string | null = null;
  showMenu = false;
  showPopup = false;
  popupInterval: any;

  constructor(public appService: AppService, private router: Router) {
    this.selectedAgent = null;
  }

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

  onSelectStation(station: StationClasse): void {
    this.router.navigate(['/preview'], { queryParams: { stationName: station.name } });
  }

  getStationPosition(index: number, arrayLength: number): string {
    return (index / (arrayLength - 1)) * 100 + '%';
  }

  onSelectAgent(agent: { name: string, photoUrl: string }) {
    this.selectedAgent = agent;
    this.showAgents = 'visible';
  
    // Assign the agent to the selected station
    if (this.selectedStation) {
      let stationId = Number(this.selectedStation);
      for (let line in this.metroLines) {
        let station = this.metroLines[line].find(station => station.id === stationId);
        if (station) {
          station.agent = agent;
          break;
        }
      }
    }
  }

  onAgentAssigned(updatedStation: any) {
    for (let line in this.metroLines) {
      let stationIndex = this.metroLines[line].findIndex(station => station.id === updatedStation.id);
      if (stationIndex !== -1) {
        this.metroLines[line][stationIndex] = updatedStation;
        break;
      }
    }
  }

  hideAgents() {
    this.showAgents = 'hidden';
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

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

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
