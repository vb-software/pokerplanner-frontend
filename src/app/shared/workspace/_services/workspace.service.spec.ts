import { TestBed } from '@angular/core/testing';

import { WorkspaceService } from './workspace.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Workspace } from '../../_models/workspace';
import { environment } from 'src/environments/environment';

describe('WorkspaceService', () => {
  let httpMock: HttpTestingController;
  const workspace: Workspace = {
    name: 'My Workspace'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    expect(service).toBeTruthy();
  });

  it('should create workspace', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    service.createWorkspace(workspace).subscribe(res => {
      expect(res).toEqual(workspace);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/workspaces`,
      'call to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush({
      statusCode: 201,
      result: workspace
    });
  });
});
