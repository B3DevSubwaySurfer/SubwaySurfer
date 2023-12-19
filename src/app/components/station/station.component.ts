import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() stationData!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.stationData)
  }
}
