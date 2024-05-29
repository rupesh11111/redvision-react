import { HttpService } from "./http.service";
 
const login = async (password, email) => {
  return await HttpService.post(`/api/v1/admin/user/login`, {
    password,
    email,
  });
};
 
export default {
  login,
};