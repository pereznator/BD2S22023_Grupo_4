import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAdminComponent } from './producto-admin.component';

describe('ProductoAdminComponent', () => {
  let component: ProductoAdminComponent;
  let fixture: ComponentFixture<ProductoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
