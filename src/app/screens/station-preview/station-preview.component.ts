import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services/app.service';  // Importez AppService
import { BorneClasse } from "../../../classes/borne.classe";

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {
  stationName: string = '';
  stationData: any;
  bornes: BorneClasse[] = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private appService: AppService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stationName = params['stationName'];
      console.log('Station name:', this.stationName);
      this.appService.getStations().then(stations => {
        const selectedStation = stations.find(station => station.name === this.stationName);
        if (selectedStation) {
          this.stationData = selectedStation; // Assignez la station sélectionnée à stationData    
          this.appService.getBornes().then(bornes => {
            this.bornes = bornes.filter(borne => borne.station_id === selectedStation.id);
            console.log('Bornes for station:', this.bornes);
          });
        } else {
          console.log('Station not found');
        }
      });
    });
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
