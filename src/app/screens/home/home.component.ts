import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../../../services/app.service";
import { StationClasse } from "../../../classes/station.classe";
import { NotificationService } from '../../../services/notification.service';

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
  bornes: any[] = [];
  showMenu = false;
  showPopup = false;
  popupInterval: any;

  constructor(public appService: AppService, private router: Router, private notificationService: NotificationService) {
    this.selectedAgent = null;
  }

  ngOnInit() {
    this.schedulePopup();
    this.appService.getStations().then(async (stations) => {
      this.stations = stations;
      this.groupStationsByLine();

      // Mettez à jour le statut d'encre pour chaque station une fois au début
      for (const lineName in this.metroLines) {
        for (const station of this.metroLines[lineName]) {
          await this.updateStationInkStatus(station);
        }
      }

      // Permet de Mettre à jour le statut d'encre pour chaque station à intervalles réguliers
      setInterval(async () => {
        for (const lineName in this.metroLines) {
          for (const station of this.metroLines[lineName]) {
            await this.updateStationInkStatus(station);
          }
        }
      }, 5000);
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
    { name: 'Vianney', photoUrl: '../../../assets/Theotime.jpeg', status: 'Disponible' },
    { name: 'Thibaut', photoUrl: '../../../assets/Theotime.jpeg', status: 'Disponible' },
    { name: 'Théotime', photoUrl: '../../../assets/Theotime.jpeg', status: 'Disponible' },
    { name: 'Baptiste', photoUrl: '../../../assets/Theotime.jpeg', status: 'Disponible' },
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

  stationInkStatuses: { [stationId: number]: string } = {};

  async updateStationInkStatus(station: StationClasse): Promise<void> {
    // Récupérez les bornes de la station
    const allBornes = await this.appService.getBornes();
    const stationBornes = allBornes.filter(borne => borne.station_id === station.id);

    // Calculez le niveau moyen d'encre de toutes les bornes de la station
    const averageInkLevel = stationBornes.reduce((sum, borne) => sum + borne.level, 0) / stationBornes.length;

    // Définissions des seuils pour les niveaux d'encre 'medium' et 'critical'
    const mediumThreshold = 50;
    const criticalThreshold = 20;

    // Déterminez le statut en fonction du niveau moyen d'encre
    let status;
    if (averageInkLevel <= criticalThreshold) {
      status = 'critical';
    } else if (averageInkLevel <= mediumThreshold) {
      status = 'medium';
    } else {
      status = 'normal';
    }

    // Mettez à jour le statut d'encre de la station
    this.stationInkStatuses[station.id] = status;
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

  notifications: string[] = [];

  showNotifications() {
    this.notifications = this.notificationService.getNotifications();
    const notificationMenu = document.querySelector('.notification-menu');
    if(notificationMenu) {
      notificationMenu.classList.add('show');
    }
  }
  
  hideNotifications() {
    const notificationMenu = document.querySelector('.notification-menu');
    if(notificationMenu) {
      notificationMenu.classList.remove('show');
    }
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}
