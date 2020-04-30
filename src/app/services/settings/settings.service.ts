import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme: 'default-dark'
  }

  constructor() {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify( this.settings ));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.applyTheme(this.settings.theme);
    } else {
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme( theme: string ) {
    let url = `assets/css/colors/${theme}.css`;
    document.getElementById('theme').setAttribute('href', url);
    this.settings.theme = theme;
    this.settings.themeUrl = url;
    this.saveSettings();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
