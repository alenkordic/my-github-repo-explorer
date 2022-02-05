import axios, { AxiosRequestConfig, AxiosResponse,AxiosInstance } from "axios";

import {
  mapResponseItemToTableData,
  mapResponseItemToDetailsData
} from "./../utils/utils";
import StorageService from "./../services/storage";
import { proxy_url } from "./../constants/enviroments";

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  metadata?: any;
}


interface AxiosResponseExtended extends AxiosResponse {
  config: AxiosRequestConfigExtended;
  duration?: number;
}

// Creating an instance
const api = axios.create({
  baseURL: "https://api.github.com/"
});

// Request interceptors
api.interceptors.request.use(
  // Set request startTime
  function (config: AxiosRequestConfigExtended): AxiosRequestConfigExtended | Promise<AxiosRequestConfigExtended> {
    const accessToken = StorageService.getItem("accessToken", null);
    // If exists, access token will be setted in the header
    if (accessToken) {
      config.headers = { Authorization: `token ${accessToken}` };
    }
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error: any):any {
    return Promise.reject(error);
  }
);

// Response interceptors
api.interceptors.response.use(
  function (response: AxiosResponseExtended): AxiosResponseExtended | Promise<AxiosResponseExtended> {
    // Set sresponse endTime & calculate the duration
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  async function (error) {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;

    const originalConfig = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        // CASE: Access Token was expired and try to get new one using refresh token
        originalConfig._retry = true;
        try {
          const {
            data: { accessToken, refreshToken }
          } = await refreshTokens();

          StorageService.setItem("accessToken", accessToken);
          StorageService.setItem("refreshToken", refreshToken);

          api.defaults.headers.common = {
            Authorization: `token ${refreshToken}`
          };

          return api(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(error);
        }
      }
    }
  }
);

interface TokensProps {
  accessToken: string | null;
  refreshToken: string | null;
}

// Exchanging temporary code for tokens
export const getTokens = (code: string | null): any => {
  const config = {
    code: code
  };
  const url = `${proxy_url}/authenticate`;
  return axios
    .post(url, config)
    .then((tokens) => {
      return {
        accessToken: tokens.data.accessToken,
        refreshToken: tokens.data.refreshToken
      };
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

// Exchanging resresh token for the new access token
export const refreshTokens = () => {
  const refreshToken = StorageService.getItem("refreshToken", null);
  const config = {
    refreshToken: refreshToken
  };
  const url = `${proxy_url}/refresh_token`;
  return axios.post(url, config);
};

// Get list of repositories
export const getRepositories = async (
  searchString: string,
  page: number,
  rowsPerPage: number
) => {
  let queryString = "";
  if (searchString.trim().length === 0) {
    queryString = `q=per_page=${rowsPerPage}&page=${page + 1}`;
  } else {
    queryString = `q=${encodeURIComponent(
      `${searchString.trim()} in:name`
    )}&per_page=${rowsPerPage}&page=${page + 1}`;
  }

  const url = `/search/repositories?${queryString}`;

  return api.get(url).then((res: AxiosResponseExtended) => {
    return {
      ...res.data,
      items: mapResponseItemToTableData(res.data.items),
      duration: res.duration
    };
  });
};

// Get exact repository
export const getRepository = async (ownew: any, name: any) => {
  const url = `/repos/${ownew}/${name}`;

  return api.get(url).then((res: AxiosResponseExtended) => {
    return {
      ...mapResponseItemToDetailsData(res.data),
      duration: res.duration
    };
  });
};

// Get authenticated user
export const getUser = async () => {
  return api.get(`/user`).then((res: any) => {
    return res.data;
  });
};
