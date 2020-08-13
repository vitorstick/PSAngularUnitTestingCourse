import { HeroesComponent } from './heroes.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent (Deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 },
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      const element = heroComponentDEs[i];
      expect(element.componentInstance.hero.name).toBe(HEROES[i].name);
    }
  });

  it(`should call heroservice deletehero when the hero component delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // TESTING BY CLICK EVENT
    // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});0

    // TESTING BY FIRING EMITTER
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the list when add hero button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mrs. Nice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: 'Mrs. Nice', strength: 2 }));
    // SET INPUT WITH THE VALUE
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = name;

    // JUST WANT THE FIRST BUTTON
    const addButtonElement = fixture.debugElement.queryAll(By.css('button'))[0];
    addButtonElement.triggerEventHandler('click', null);

    fixture.detectChanges();

    // GET THE NAME LIST FROM THE HTML
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroText).toContain(name);
  });
});
