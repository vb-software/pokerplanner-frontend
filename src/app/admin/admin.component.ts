import { Component, OnInit } from '@angular/core';
import { Workspace } from '../shared/_models/workspace';
import { WorkspaceService } from '../shared/workspace/_services/workspace.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  workspaces: Array<Workspace>;

  constructor(private workspaceService: WorkspaceService, private toast: ToastrService) {}

  ngOnInit() {
    this.workspaceService.getWorkspaceSummaries().subscribe(
      workspaces => (this.workspaces = workspaces),
      err => {
        console.log('some error occurred');
      }
    );
  }

  addWorkspace() {
    this.workspaces.push({ name: 'Edit name' });
  }

  saveWorkspace(workspace: Workspace) {
    this.workspaceService.createWorkspace(workspace).subscribe(
      res => {
        this.toast.success('Workspace saved successfully');
      }
    );
  }
}
