// app.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.initializeData();
  }

  playAudio() {
    this.audioPlayerRef.nativeElement.play();
  }
}
