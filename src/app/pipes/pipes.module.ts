import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { NamePipe } from './name.pipe';



@NgModule({
  declarations: [ImagenPipe, NamePipe],
  imports: [],
  exports: [ImagenPipe, NamePipe]
})
export class PipesModule { }
