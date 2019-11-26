import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Workspace } from '../../_models/workspace';
import { httpOptions } from 'src/app/shared/workspace/_constants/httpOptions';
import { environment } from 'src/environments/environment';

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

  getWorkspaces(): Observable<Array<Workspace>> {
    return this.http.get<Array<Workspace>>(this.apiUrl)
      .pipe(
        catchError(err => throwError(err)),
        map<any, Array<Workspace>>(res => res.result)
      );
  }
}
