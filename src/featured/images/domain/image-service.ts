export interface ImageService {
  getImg(url: string): Promise<any>;
  uploadImage(image: any, name: string): Promise<string>;
  deleteImage(url: string): Promise<Boolean>;
}
