import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaAdminComponent } from './tienda-admin.component';

describe('TiendaAdminComponent', () => {
  let component: TiendaAdminComponent;
  let fixture: ComponentFixture<TiendaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
