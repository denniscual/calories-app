import { httpService } from "./config.service";

export interface SigninInput {
  username: string;
  password: string;
}
export interface SigninDataResponse {
  id: string;
  roles: string[];
  accessToken: string;
  fullName: string;
}

export async function signin(input: SigninInput): Promise<SigninDataResponse> {
  const res = await httpService.post("/auth/signin", input);
  return res.data.data;
}
