import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from "../../../services/security.service";
import { AppService } from "../../../services/app.service";
import { StationClasse } from "../../../classes/station.classe";
import {SecurityAgent} from "../../../classes/agent.classe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  showAlert = false;
  alertMessage = '';
  showSelectAgentPopup = false;
  currentAlert = '';
  alertScenarios = [
    "Situation d'urgence",
    "Objet suspect trouvé",
    "Activité suspecte signalée",
    // ... Ajouter d'autres scénarios génériques ici ...
  ];


  constructor(
      public appService: AppService,
      private router: Router,
      private toastr: ToastrService,
      private securityService: SecurityService
  ) {
    // Test de ngx-toastr
    this.toastr.success('Notification de test', 'Test', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
  }


  ngOnInit() {
    setInterval(() => this.triggerRandomAlert(), 30000); // Déclenche une alerte toutes les 30 secondes
  }


  triggerRandomAlert() {
    const randomScenario = this.alertScenarios[Math.floor(Math.random() * this.alertScenarios.length)];
    this.currentAlert = randomScenario;
    this.showSelectAgentPopup = true;
  }

  assignAgent(agent: SecurityAgent): void {
    if (agent.isAvailable) {
      this.securityService.assignAgentToAlert(this.currentAlert, agent.name);
      this.toastr.success(`Agent ${agent.name} assigné à l'alerte: ${this.currentAlert}`, 'Succès');
      this.showSelectAgentPopup = false;
    } else {
      this.toastr.error(`L'agent ${agent.name} n'est pas disponible`, 'Erreur');
    }
  }
  handleAlert(alertMessage: string): void {
    console.log(`Traitement de l'alerte: ${alertMessage}`);
    if (!this.securityService.assignAgentToAlert(alertMessage)) {
      console.log('Aucun agent disponible pour l\'alerte');
      this.showAlert = true;
      this.alertMessage = `Erreur: ${alertMessage}`;
      setTimeout(() => this.showAlert = false, 3000); // Cache la notification après 3 secondes
    } else {
      console.log(`Agent assigné à l'alerte: ${alertMessage}`);
      setTimeout(() => {
        this.securityService.resolveAlert(alertMessage);
        this.showAlert = true;
        this.alertMessage = `Succès: Alerte résolue: ${alertMessage}`;
        setTimeout(() => this.showAlert = false, 3000);
      }, 10000); // Supposons que la résolution de l'alerte prend 10 secondes
    }
  }

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
}
