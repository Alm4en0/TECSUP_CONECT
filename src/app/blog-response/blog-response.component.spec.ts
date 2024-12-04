import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogResponseComponent } from './blog-response.component';

describe('BlogResponseComponent', () => {
  let component: BlogResponseComponent;
  let fixture: ComponentFixture<BlogResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
