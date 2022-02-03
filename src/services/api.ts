import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { resolve } from "path/posix";
import {
  mapResponseItemToTableData,
  mapResponseItemToDetailsData,
  getLocalAccessToken,
  getLocalRefreshToken,
} from "./../utils/utils";

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  metadata?: any;
}
interface AxiosResponseExtended extends AxiosResponse {
  config: AxiosRequestConfigExtended;
  duration?: number;
}

const api = axios.create({
  baseURL: "https://api.github.com/",
});

// Request interceptor will set startTime
api.interceptors.request.use(
  function (config: AxiosRequestConfigExtended): any {
    const accessToken = getLocalAccessToken();

    if (accessToken) {
      config.headers = { Authorization: `token ${accessToken}` };
    }
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor will set endTime & calculate the duration
api.interceptors.response.use(
  function (response: AxiosResponseExtended) {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  function (error) {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;

    const originalConfig = error.config;

    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        console.log("originalConfig", originalConfig)
        // try {

        //   const rs = await refreshToken();

        //   const { accessToken } = rs.data;
        //   window.localStorage.setItem("accessToken", accessToken);
        //   api.defaults.headers.common["x-access-token"] = accessToken;

        //   return api(originalConfig);
        // } catch (_error) {
        //   if (_error.response && _error.response.data) {
        //     return Promise.reject(_error.response.data);
        //   }

          return Promise.reject(error);
        }
      }
    }
);

// function refreshToken() {
//   return api.post("/auth/refreshtoken", {
//     refreshToken: getLocalRefreshToken(),
//   });
// }

export const getTokens = async (url: string, code: string | null) => {
  const config = {
    code: code,
  };
  return api
    .post(url, config)
    .then((tokens) => {
      return {
        accessToken: tokens.data.access_token,
        refreshToken: tokens.data.refresh_token,
      };
    })
    .catch((error) => {
      // console.error("There was an error!", { errorMessage: error.message });
      console.error("There was an error!", error);
    });
};

// GETTERS
export const getRepositories = async (
  searchString: string,
  page: number,
  rowsPerPage: number
) => {
  let queryString = "";
  // const queryString = 'q=' + encodeURIComponent('react-complete-guide-code in:name');
  if (searchString.trim().length === 0) {
    queryString = `q=per_page=${rowsPerPage}&page=${page + 1}`;
  } else {
    queryString = `q=${encodeURIComponent(
      `${searchString.trim()} in:name`
    )}&per_page=${rowsPerPage}&page=${page + 1}`;
  }

  const url = `https://api.github.com/search/repositories?${queryString}`;

  return api.get(url).then((res: AxiosResponseExtended) => {
    return {
      ...res.data,
      items: mapResponseItemToTableData(res.data.items),
      duration: res.duration,
    };
  });
};

export const getRepository = async (ownew: any, name: any) => {
  const url = `https://api.github.com/repos/${ownew}/${name}`;
  return api.get(url).then((res: AxiosResponseExtended) => {
    return {
      ...mapResponseItemToDetailsData(res.data),
      duration: res.duration,
    };
  });
};

export const getUser = async () => {
  return api.get(`https://api.github.com/user`).then((res: any) => {
    return res.data;
  });
};

// export const refetchToken = ()=> {
//   api.get...
// }

//logiku prebaciti ovde za fetch tokena
