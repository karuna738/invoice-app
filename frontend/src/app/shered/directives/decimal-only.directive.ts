// decimal-only.directive.ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalOnly]'
})
export class DecimalOnlyDirective {
  private allowedKeys: string[] = [
    'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    // Allow control keys
    if (this.allowedKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Allow only 0-9
    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    // Allow only one dot (.)
    if (event.key === '.' && input.value.indexOf('.') === -1) {
      return;
    }

    // Block everything else
    event.preventDefault();
  }
}
