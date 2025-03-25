import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescibeproductComponent } from './descibeproduct.component';

describe('DescibeproductComponent', () => {
  let component: DescibeproductComponent;
  let fixture: ComponentFixture<DescibeproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescibeproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescibeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
