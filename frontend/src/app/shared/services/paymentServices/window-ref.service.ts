import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  getNativeWindow() {
    return getWindow();
  }
  constructor() {}
}
