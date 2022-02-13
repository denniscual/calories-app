import { httpService } from "./config.service";

export async function signin(formData: { username: string; password: string }) {
  try {
    const res = await httpService.post("/auth/signin", formData);
    const { accessToken, id, roles } = res.data.data;
    localStorage.setItem(
      "user",
      JSON.stringify({
        id,
        roles,
        accessToken,
      })
    );
    // Delete the "token".
    delete res.data.data.accessToken;
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
