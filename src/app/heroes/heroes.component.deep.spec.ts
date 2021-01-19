import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from './heroes.component';
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', streggth: 8},
      {id: 2, name: 'Wonderful Woman', streggth: 24},
      {id: 3, name: 'SuperDude', streggth: 55}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOInit
    fixture.detectChanges();

    const heroComponetDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponetDEs.length).toEqual(3);
    for (let i = 0; i < heroComponetDEs.length; i++){
      expect(heroComponetDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[1].query(By.css('button')).triggerEventHandler('focus', {stopPropagation: () => {}});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);
  });
});
