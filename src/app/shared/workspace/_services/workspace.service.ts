import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { httpOptions } from 'src/app/shared/workspace/_constants/httpOptions';
import { environment } from 'src/environments/environment';
import { Workspace } from '../../_models/workspace';
import { WorkspaceSummary } from '../../_models/workspace-summary';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient) { }

  createWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(this.apiUrl, workspace, httpOptions)
      .pipe(
        catchError(err => throwError(err)),
        map<any, Workspace>(res => res.result)
      );
  }

  getWorkspaceSummaries(): Observable<Array<WorkspaceSummary>> {
    return this.http.get<Array<WorkspaceSummary>>(`${this.apiUrl}/summaries`)
      .pipe(
        catchError(err => throwError(err)),
        map<any, Array<WorkspaceSummary>>(res => res.result)
      );
  }
}
