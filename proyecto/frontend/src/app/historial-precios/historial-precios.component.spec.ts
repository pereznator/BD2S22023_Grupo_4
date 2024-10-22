import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPreciosComponent } from './historial-precios.component';

describe('HistorialPreciosComponent', () => {
  let component: HistorialPreciosComponent;
  let fixture: ComponentFixture<HistorialPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
