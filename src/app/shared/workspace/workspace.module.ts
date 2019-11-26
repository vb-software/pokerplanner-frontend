import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from './_services/workspace.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WorkspaceModule {
  static forRoot() {
    return {
      ngModule: WorkspaceModule,
      providers: [WorkspaceService]
    };
  }
}
