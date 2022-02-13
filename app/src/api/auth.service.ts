import { httpService } from "./config.service";

export async function signin(formData: { username: string; password: string }) {
  return await httpService.post("/auth/signin", formData);
}
