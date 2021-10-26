import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [FormBuilder],
      declarations: [HomeComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has name input', () => {
    const nameInput: DebugElement = el.query(By.css('#name'));
		expect(nameInput).toBeTruthy();
  });

  it('has submit button', () => {
    const submitBtn: DebugElement = el.query(By.css('button'));
		expect(submitBtn).toBeTruthy();
  });

  it('test form validity', () => {
		const form = component.form;
		expect(form.valid).toBeFalsy();

		const name = form.controls.name;
		name.setValue('gustavo');

		expect(form.valid).toBeTruthy();
	});

  it('test form error for empty name', () => {
		const form = component.form;
		expect(form.valid).toBeFalsy();

		const name = form.controls.name;
		expect(name.valid).toBeFalsy();

		fixture.detectChanges();
		expect(form.valid).toBeFalsy();
	});
});
