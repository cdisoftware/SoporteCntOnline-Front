import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaElectronicaComponent } from './nomina-electronica.component';

describe('NominaElectronicaComponent', () => {
  let component: NominaElectronicaComponent;
  let fixture: ComponentFixture<NominaElectronicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominaElectronicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominaElectronicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
