import { Image } from "../domain/image";
import { ImageService } from "../domain/image-service";
import { http } from "../../shared/http/http";

export class ImageHttpService implements ImageService {
  async getImg(url: string): Promise<any> {
    return await http.get(`/images/${url}`);
  }
  async uploadImage(image: any, name: string): Promise<string> {
    const headerExtension = name.split(".").pop();
    const response = await http.post(`/images/?name=${name}`, image, {
      headers: { "Content-Type": `image/${headerExtension}` }
    });
    return response.data;
  }
  async deleteImage(id): Promise<Boolean> {
    return await http.delete(`/images/${id}`);
  }
}
