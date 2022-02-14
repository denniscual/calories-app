import { httpService } from "./config.service";

export interface SigninInput {
  username: string;
  password: string;
}
export interface SigninDataResponse {
  id: string;
  roles: string[];
  accessToken: string;
}

export async function signin(
  formData: SigninInput
): Promise<SigninDataResponse> {
  try {
    const res = await httpService.post("/auth/signin", formData);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
