import { Component, Input } from '@angular/core';
import { TvmComponent } from '../tvm/tvm.component';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  @Input() stationName!: string;

  // Create three instances of TvmComponent with different values
  tvm1: TvmComponent = {
    id: 1,
    ink_level: 100,
    paper_level: 100,
    status: 1
  };

  tvm2: TvmComponent = {
    id: 2,
    ink_level: 100,
    paper_level: 100,
    status: 2
  };

  tvm3: TvmComponent = {
    id: 3,
    ink_level: 100,
    paper_level: 100,
    status: 3
  };
}
