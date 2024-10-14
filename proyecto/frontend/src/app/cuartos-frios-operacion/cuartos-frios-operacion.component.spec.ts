import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartosFriosOperacionComponent } from './cuartos-frios-operacion.component';

describe('CuartosFriosOperacionComponent', () => {
  let component: CuartosFriosOperacionComponent;
  let fixture: ComponentFixture<CuartosFriosOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuartosFriosOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuartosFriosOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
