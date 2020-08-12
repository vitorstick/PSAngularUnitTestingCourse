import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have a correct hero', () => {
    fixture.componentInstance.hero = { id: 11, name: 'Mr. Nice', strength: 10 };

    expect(fixture.componentInstance.hero.name).toEqual('Mr. Nice');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 11, name: 'Mr. Nice', strength: 10 };
    fixture.detectChanges();

    const deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('Mr. Nice');

    // OTHER WAY TO DO THE SAME TEST
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Mr. Nice');
  });
});
