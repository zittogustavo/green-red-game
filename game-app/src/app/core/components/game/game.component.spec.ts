import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule
      ],
      declarations: [GameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test submit button call', fakeAsync(() => {
    spyOn(component, 'step');
    fixture.detectChanges();

		const button = fixture.debugElement.nativeElement.querySelector('button');
		expect(fixture.debugElement.queryAll(By.css('button'))[0].nativeElement.attributes.click).not.toBeNull();
		button.click();
		tick();

		expect(component.step).toHaveBeenCalled();
  }));

});
