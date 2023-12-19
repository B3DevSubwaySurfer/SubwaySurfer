import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tvm',
  templateUrl: './tvm.component.html',
  styleUrls: ['./tvm.component.css']
})
export class TvmComponent {
  @Input() id!: number;
  @Input() ink_level!: number;
  @Input() paper_level!: number;
  @Input() status!: number;
}
