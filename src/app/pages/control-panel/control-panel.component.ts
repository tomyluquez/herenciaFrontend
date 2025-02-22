import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import menuesControlPanel from '../../data/menuesControlPanel.json';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent {
  @BlockUI() blockUI!: NgBlockUI;

  menues = menuesControlPanel.Items;

  panelSelected!: string;

  constructor() {}

  selectPanel(panel: string) {
    this.panelSelected = panel;
  }
}
