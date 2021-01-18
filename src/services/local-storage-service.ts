export class LocalStorageService {
  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported = typeof window['localStorage'] != 'undefined' && window['localStorage'] != null;
  }

  add(key: string, item: string) {
    if (!this.localStorageSupported) {
      return;
    }
    localStorage.setItem(key, item);
  }

  get(key: string): string | null {
    if (!this.localStorageSupported) {
      return null;
    }
    return localStorage.getItem(key);
  }

  exists(key: string, value: string): boolean {
    if (!this.localStorageSupported) {
      return false;
    }
    return localStorage.getItem(key) === value;
  }

  remove(key: string) {
    if (!this.localStorageSupported) {
      return;
    }
    localStorage.removeItem(key);
  }
}
