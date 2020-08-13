import { HeroesComponent } from "./heroes.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (Deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ];

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))

    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      const element = heroComponentDEs[i];
      expect(element.componentInstance.hero.name).toBe(HEROES[i].name);
    }
  });

});
