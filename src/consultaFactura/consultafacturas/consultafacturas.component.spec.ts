import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultafacturasComponent } from './consultafacturas.component';

describe('ConsultafacturasComponent', () => {
  let component: ConsultafacturasComponent;
  let fixture: ComponentFixture<ConsultafacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultafacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultafacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
