import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let mockActivateRoute;
  let mockHeroService;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  const HERO = { id: 5, name: 'Mrs. Nice', strength: 2 };

  beforeEach(() => {
    mockActivateRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivateRoute },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of(HERO));
  });

  it('should render hero name in a h2 tag', () => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(HERO.name.toUpperCase());
  });
});
