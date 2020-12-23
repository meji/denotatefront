import { Site } from "../domain/site";
import { http } from "../../shared/http/http";

export class SiteService {
  async createSite(data: Partial<Site>): Promise<Site> {
    return (await http.post("/site/", data)).data;
  }
  async updateSite(data: Partial<Site>): Promise<Site> {
    return (await http.put("/site/", data)).data;
  }
  async getSite(): Promise<Site> {
    return (await http.get("/site/")).data;
  }
}
