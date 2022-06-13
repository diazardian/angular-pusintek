import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiComponent } from './divisi.component';

describe('DivisiComponent', () => {
  let component: DivisiComponent;
  let fixture: ComponentFixture<DivisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
