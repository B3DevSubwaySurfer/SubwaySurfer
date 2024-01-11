import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  @Input() selectedAgent: any;
  @Output() closePopupEvent = new EventEmitter<void>();
  stations: any[] = [];
  selectedStation: any;
  isPopupVisible = true;

  constructor(private appService: AppService) { }

  closePopup() {
    this.closePopupEvent.emit();
  }

  ngOnInit(): void {
    this.stations = this.appService.getAllStations();
  }

  assignAgent() {
    if (this.selectedStation) {
      this.selectedStation.agent = this.selectedAgent;
    }
  }

  updateSelectedStation(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStation = this.stations[selectElement.selectedIndex];
  }
}