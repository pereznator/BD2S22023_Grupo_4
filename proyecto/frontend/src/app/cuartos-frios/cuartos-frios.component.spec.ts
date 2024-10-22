import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartosFriosComponent } from './cuartos-frios.component';

describe('CuartosFriosComponent', () => {
  let component: CuartosFriosComponent;
  let fixture: ComponentFixture<CuartosFriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuartosFriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuartosFriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
