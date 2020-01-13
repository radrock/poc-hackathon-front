import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstationVisualizationComponent } from './substation-visualization.component';

describe('SubstationVisualizationComponent', () => {
  let component: SubstationVisualizationComponent;
  let fixture: ComponentFixture<SubstationVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstationVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstationVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
