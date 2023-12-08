import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarrealComponent } from './navbarreal.component';

describe('NavbarrealComponent', () => {
  let component: NavbarrealComponent;
  let fixture: ComponentFixture<NavbarrealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarrealComponent]
    });
    fixture = TestBed.createComponent(NavbarrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
