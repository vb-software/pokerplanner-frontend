import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceSummary } from '../../_models/workspace-summary';

@Component({
  selector: 'app-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss']
})
export class WorkspaceCardComponent implements OnInit {
  @Input() workspaceSummary: WorkspaceSummary;

  constructor() { }

  ngOnInit() {
  }

}
