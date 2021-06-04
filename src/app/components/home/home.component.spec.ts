import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { BlogsService } from 'src/app/services/blogs.service';
import { MockBlogService } from 'src/app/services/mock-blog.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ HomeComponent ],
      providers: [{provide: BlogsService, useClass: MockBlogService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  // Test blogs in the secenario that there is data in the blogs array when you collect data from API
  it('should have blogs', () => {
    expect(component.blogs.length).toBeGreaterThan(0);

    expect(component.blogs[0].title).toBe('Filips Testblog 1');
    expect(component.blogs[1].title).toBe('Filips Testblog 2');
  });


});
