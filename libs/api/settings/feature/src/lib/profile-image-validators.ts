import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const profileImageValidators = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 2500000 }),
    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
  ],
  fileIsRequired: false,
});
