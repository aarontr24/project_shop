import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'users'): unknown {
    let url = URL_SERVICIOS + '/img';
    if (!img) {
      return url + '/users/xxx';
    }

    switch (tipo) {
      case 'users':
        url += '/users/' + img;
        break;
      case 'products':
        url += '/products/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, users, products');
        url += '/users/xxx';
        break;
    }
    return url;
  }

}
