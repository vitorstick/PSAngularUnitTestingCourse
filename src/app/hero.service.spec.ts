import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService}
      ]
    });

    // ONE WAY TO INSTATIATE THE SERVICES
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe('getHero', () => {
    // OTHER WAY TO INSTATIATE THE SERVICES
    // it('should get with correct url',
    //   inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
    //     service.getHero(4).subscribe();
    // }));
    it('should get with correct url', () => {
        service.getHero(4).subscribe(res => {
          console.log('res', res);
          expect(res).toEqual({id: 4, name: 'super dude', strength: 20});
        });

        const req = httpTestingController.expectOne('api/heroes/4');
        req.flush({id: 4, name: 'super dude', strength: 20});
        httpTestingController.verify();
    });
  });

});
