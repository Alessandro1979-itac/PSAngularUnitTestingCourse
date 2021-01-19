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
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });
});
