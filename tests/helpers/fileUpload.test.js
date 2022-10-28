import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dzk5uwpiv',
  api_key: '336962425896914',
  api_secret: '9PYnWRNvBr0_e4oz-SErNFZ53dM',
  secure: true
});

describe('testing fileUpload.', () => {
  test('should upload a file to cloudinary correctly.', async() => {
    
    const imgURL = "https://i.picsum.photos/id/662/200/200.jpg?hmac=LdYzwSk5Qj10-4AVlHBneunSCcoSnwW8D2qHz-GD2U8";
    const response = await fetch( imgURL );
    const blob = await response.blob();
    const file = new File([blob], 'test.jpg');
    const url = await fileUpload(file);
    expect(url).toEqual(expect.any(String));

    const segments = url.split('/');
    const imageId = segments.at(-1).replace('.jpg', '');

    await cloudinary.api.delete_resources([ 'journal/' + imageId ]);
  });

  test('should return null', async() => {
    const file = new File([], 'test.png');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});