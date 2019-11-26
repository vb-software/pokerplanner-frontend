import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from './_services/workspace.service';
import { WorkspaceCardComponent } from './workspace-card/workspace-card.component';

@NgModule({
  declarations: [WorkspaceCardComponent],
  imports: [
    CommonModule
  ],
  exports: [WorkspaceCardComponent]
})
export class WorkspaceModule {
  static forRoot() {
    return {
      ngModule: WorkspaceModule,
      providers: [WorkspaceService]
    };
  }
}
