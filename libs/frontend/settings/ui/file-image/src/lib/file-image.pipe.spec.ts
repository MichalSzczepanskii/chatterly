import { FileImagePipe } from './file-image.pipe';
import * as converter from '@chatterly/frontend/shared/utils';

describe('FileImagePipe', () => {
  it('should convert file to base64 string', () => {
    jest.spyOn(converter, 'convertFileToBase64');
    const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
    const pipe = new FileImagePipe();
    return pipe.transform(mockFile).then(output => {
      expect(converter.convertFileToBase64).toHaveBeenCalledWith(mockFile);
      expect(typeof output).toBe('string');
      expect(output).not.toBe('');
    });
  });
});
