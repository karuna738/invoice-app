import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  private allowedKeys: string[] = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.allowedKeys.indexOf(event.key) !== -1 || (event.key >= '0' && event.key <= '9')) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
