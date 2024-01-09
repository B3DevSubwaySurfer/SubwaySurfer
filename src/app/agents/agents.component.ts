import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  agents: string[] = ['Agent 1', 'Agent 2', 'Agent 3'];

  constructor() { }

  ngOnInit(): void {
  }
}