import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {
  stationData: any;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stationData = JSON.parse(params['stationData']);
    });
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
