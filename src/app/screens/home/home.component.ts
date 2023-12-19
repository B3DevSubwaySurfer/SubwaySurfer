import { Component } from '@angular/core';
import { Router } from '@angular/router';

class Borne {
  constructor(public id: number, public ink_level: number, public paper_level: number, public status: number) {}
}

class Station {
  constructor(public name: string, public bornes: Borne[]) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  metroLine1: Station[] = [
    new Station('Lille CHU-Eurasanté', [
      new Borne(1, 100, 100, 1),
      new Borne(2, 95, 100, 1)
    ]),
    new Station('Gare Lille Flandres', [
      new Borne(1, 100, 100, 1),
      new Borne(2, 95, 100, 1),
      new Borne(3, 100, 90, 1),
      new Borne(4, 100, 100, 0)
    ])
  ];

  metroLine2A: Station[] = [
    new Station('Saint-Philibert', [
      new Borne(1, 100, 100, 1),
      new Borne(2, 95, 80, 1)
    ]),
    new Station('Gare Lille Flandres', [
      new Borne(5, 100, 100, 1),
      new Borne(6, 90, 100, 1)
    ])
  ];

  metroLine2B: Station[] = [
    new Station('Mairie de Mons', [
      new Borne(1, 100, 100, 1),
      new Borne(2, 85, 90, 0)
    ]),
    new Station('Tourcoing C.H. Dron', [
      new Borne(1, 100, 100, 1),
      new Borne(2, 80, 80, 1)
    ])
  ];

  constructor(private router: Router) { }

  getStationPosition(index: number, arrayLength: number): string {
    return (index / (arrayLength - 1)) * 100 + '%';
  }

  onSelectStation(station: Station): void {
    this.router.navigate(['/preview'], { queryParams: { stationData: JSON.stringify(station) } });
  }
}
