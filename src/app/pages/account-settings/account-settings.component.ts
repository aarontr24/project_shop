import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService ) {}

  ngOnInit(): void {
    this.locationCheck();
  }

  cambiarColor( theme: string, link: ElementRef) {
    this.applyCheck( link );
    this._settings.applyTheme( theme );
  }

  applyCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  locationCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let theme = this._settings.settings.theme;
    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
