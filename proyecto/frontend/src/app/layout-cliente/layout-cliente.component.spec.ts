import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClienteComponent } from './layout-cliente.component';

describe('LayoutClienteComponent', () => {
  let component: LayoutClienteComponent;
  let fixture: ComponentFixture<LayoutClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
