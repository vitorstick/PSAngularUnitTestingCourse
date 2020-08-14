import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
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

  it('should call update hero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // to async wait 250
    // tick(250);

    // to make zone run all pending actions
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it('should call update hero when save is called but using promises', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
