import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaOperacionComponent } from './bodega-operacion.component';

describe('BodegaOperacionComponent', () => {
  let component: BodegaOperacionComponent;
  let fixture: ComponentFixture<BodegaOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodegaOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegaOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
