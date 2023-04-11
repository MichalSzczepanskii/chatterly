import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileImagePipe } from './file-image.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FileImagePipe],
  exports: [FileImagePipe],
})
export class FrontendSettingsUiFileImageModule {}
