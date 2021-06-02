import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Blog } from 'src/app/models/Blog';

describe('BlogComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ BlogComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test displaying data from a blog 
  it('it should present a blog title', () => {
    let h2Tag: HTMLHeadingElement = fixture.nativeElement.querySelector('h2');

    expect(h2Tag.innerText).toBe('Test');
  });
});

@Component({
  template: `<app-blog [blog]="blogToSend"></app-blog>`,
})
class TestHostComponent {
  blogToSend: Blog = {id: 0, title: 'Test', created: new Date(), userId: 2021525, posts: []}
}
