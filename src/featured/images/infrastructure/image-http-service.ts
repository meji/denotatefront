import {ImageService} from '../domain/image-service';
import {http} from '../../shared/http/http';

export class ImageHttpService implements ImageService {
  async getImg(url: string): Promise<any> {
    return await http.get(`/uploads/${url}`);
  }
  async uploadImage(image: any, name: string): Promise<string> {
    const headerExtension = name.split(".").pop();
    const response = await http.post(`/images/?name=${name}`, image, {
      headers: { "Content-Type": `image/${headerExtension}` }
    });
    return response.data;
  }
  async deleteImage(name: string): Promise<{}> {
    return await http.delete(`/images/?name=${name}`);
  }
}
