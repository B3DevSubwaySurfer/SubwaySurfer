import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {
  stationName: string | null = null;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stationName = params['stationName'];
    });
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
