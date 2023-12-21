import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localstorage.services';

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {
  stationName: string = ''; // Initialisation de la propriété
  stationData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stationName = params['stationName'];
      this.stationData = this.getStationDataFromLocalStorage(this.stationName);
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private localStorageService: LocalStorageService) {
    // Execute the function every 2 seconds
    setInterval(() => {
      this.stationData = this.getStationDataFromLocalStorage(this.stationName);
    }, 1000);
  }

  private getStationDataFromLocalStorage(stationName: string): any {
    // Utilisez le nom de la station pour récupérer les données du LocalStorage
    const metroLines = this.localStorageService.getData('metroLinesData');

    if (metroLines) {
      const allStations = [...metroLines.metroLine1, ...metroLines.metroLine2A, ...metroLines.metroLine2B];
      const selectedStation = allStations.find(station => station.name === stationName);
      return selectedStation;
    }
    return null;
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
