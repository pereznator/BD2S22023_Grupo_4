import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComprasComponent } from './reporte-compras.component';

describe('ReporteComprasComponent', () => {
  let component: ReporteComprasComponent;
  let fixture: ComponentFixture<ReporteComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
