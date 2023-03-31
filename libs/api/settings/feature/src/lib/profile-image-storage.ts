import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const profileImageStorage = diskStorage({
  destination: './uploads/profile-images',
  filename: (req, file, cb) => {
    const randomName = uuidv4();
    const extension = path.parse(file.originalname).ext;
    return cb(null, `${randomName}${extension}`);
  },
});
