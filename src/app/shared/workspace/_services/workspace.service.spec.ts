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

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    httpMock = TestBed.get(HttpTestingController);
    expect(service).toBeTruthy();
  });

  it('should create workspace', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    httpMock = TestBed.get(HttpTestingController);

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

  it('should throw error while attempting to create workspace', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    httpMock = TestBed.get(HttpTestingController);
    service.createWorkspace(workspace).subscribe(
      () => fail('Should not see me'),
      err => {
        expect(err);
      }
    );

    const req = httpMock.expectOne(
      `${environment.apiUrl}/workspaces`,
      'call to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush(null, {
      status: 500,
      statusText: 'dummy error'
    });
  });

  it('should get workspaces', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    httpMock = TestBed.get(HttpTestingController);

    const workspaces: Array<Workspace> = [];

    service.getWorkspaces().subscribe(res => {
      expect(res).toEqual(workspaces);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/workspaces`,
      'call to api'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      statusCode: 200,
      result: workspaces
    });
  });

  it('should throw error while attempting to get workspaces', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    httpMock = TestBed.get(HttpTestingController);

    service.getWorkspaces().subscribe(() => {
      fail('should not see me');
    },
    err => {
      expect(err);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/workspaces`,
      'call to api'
    );
    expect(req.request.method).toBe('GET');

    req.flush(null, {
      status: 500,
      statusText: 'error thrown'
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
