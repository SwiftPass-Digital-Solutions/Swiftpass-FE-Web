import { CommonModule } from '@angular/common';
import { Component, Optional, Self, input, model } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.html',
})
export class Input implements ControlValueAccessor {
  readonly id = input();
  readonly type = input('text');
  readonly placeholder = input('');
  readonly required = input(false);
  label = input('');
  disabled = model(false);

  value = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string) => {};

  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  get errorMessages(): string[] {
    if (!this.ngControl || !this.ngControl.errors || this.ngControl.pristine || this.ngControl.valid) {
      return [];
    }

    const errors = this.ngControl.errors;
    const messages: string[] = [];

    if (errors['required']) {
      messages.push(`${this.ngControl.name} is required`);
    }
    if (errors['minlength']) {
      messages.push(`Minimum length is ${errors['minlength'].requiredLength} characters`);
    }
    if (errors['maxlength']) {
      messages.push(`Maximum length is ${errors['maxlength'].requiredLength} characters`);
    }
    if (errors['pattern']) {
      messages.push('Invalid format');
    }
    if (errors['email']) {
      messages.push('Please enter a valid email address');
    }
    return messages;
  }
}
