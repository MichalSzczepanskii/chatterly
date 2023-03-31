import { Pipe, PipeTransform } from '@angular/core';
import { convertFileToBase64 } from '@chatterly/frontend/shared/utils';

@Pipe({
  name: 'fileImage',
})
export class FileImagePipe implements PipeTransform {
  async transform(value: File): Promise<string> {
    return await convertFileToBase64(value);
  }
}
