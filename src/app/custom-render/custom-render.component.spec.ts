import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRenderComponent } from './custom-render.component';

describe('CustomRenderComponent', () => {
  let component: CustomRenderComponent;
  let fixture: ComponentFixture<CustomRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
