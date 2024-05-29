import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
 
export const HttpService = axios.create({
  baseURL: "https://test.truequations.com/api",
});
 
HttpService.interceptors.request.use((config) => {
  let auth = localStorage.getItem("auth");
  if (auth) {
    auth = JSON.parse(auth);
    config.headers.Authorization = "Bearer " + auth.accessToken;
    config.headers.userid = auth.userID;
  }
  return config;
});
 
HttpService.interceptors.response.use(
  function (response) {
    if (response.data.message) {
      console.log(response.data.message);
    }
    return response;
  },
  function (error) {
    localStorage.removeItem("auth");
    return Promise.reject(error);
  }
);
const refreshAuthLogic = async (failedRequest) => {
  let authObj;
  const authStr = localStorage.getItem("auth");
  if (authStr) {
    authObj =
      typeof localStorage.getItem("auth") === "string"
        ? JSON.parse(authStr)
        : authObj;
    return HttpService.post(`/api/v1/refresh-token`, {
      refreshToken: authObj.refreshToken,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(
            "auth",
            JSON.stringify(response.data.data.tokens)
          );
          failedRequest.response.config.headers.Authorization =
            "Bearer " + response.data.data.tokens.accessToken;
          return Promise.resolve();
        } else {
          localStorage.removeItem("auth");
          window.location.reload();
          return Promise.reject();
        }
      })
      .catch((e) => {
        localStorage.removeItem("auth");
        window.location.reload();
        return Promise.reject();
      });
  } else {
    localStorage.removeItem("auth");
    return Promise.reject();
  }
};
createAuthRefreshInterceptor(HttpService, refreshAuthLogic);