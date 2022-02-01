import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  mapResponseItemToTableData,
  mapResponseItemToDetailsData,
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
    return Promise.reject(error);
  }
);

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

  const accessToken = localStorage.getItem("access_token");

  let headers = {};
  if (accessToken) {
    headers = { Authorization: `token ${accessToken}` };
  }

  const config = {
    headers,
  };
  return api
    .get(`/search/repositories?${queryString}`, config)
    .then((res: AxiosResponseExtended) => {
      return {
        ...res.data,
        items: mapResponseItemToTableData(res.data.items),
        duration: res.duration,
      };
    });
};

export const getRepository = async (ownew: any, name: any) => {
  const url = `/repos/${ownew}/${name}`;
  return api
    .get(url, { headers: { Accept: "application/vnd.github.v3+json" } })
    .then((res: AxiosResponseExtended) => {
      return {
        ...mapResponseItemToDetailsData(res.data),
        duration: res.duration,
      };
    });
};

export const getUser = async (accessToken: string | null) => {
  const config = {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  };
  return api.get(`/user`, config).then((res: any) => {
    return res.data;
  });
};
