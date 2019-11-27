import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceCardComponent } from './workspace-card.component';

describe('WorkspaceCardComponent', () => {
  let component: WorkspaceCardComponent;
  let fixture: ComponentFixture<WorkspaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceCardComponent);
    component = fixture.componentInstance;
    component.workspaceSummary = {
      name: 'MyWorkspace',
      allowRevotes: true,
      averageScore: 0,
      hideUserVotes: true,
      releasesCount: 0,
      scoreSystem: 'Fibonnaci',
      usersCount: 0,
      guid: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
