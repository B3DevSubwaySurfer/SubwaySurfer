import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services/app.service';  // Importez AppService

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {
  stationName: string = '';
  stationData: any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private appService: AppService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stationName = params['stationName'];
      this.stationData = this.appService.getStationData(this.stationName);
    });
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
