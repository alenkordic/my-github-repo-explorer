import axios from "axios";
import { mapResponseItemToTableData } from "./../utils/utils";

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export const getRepositories = (searchString: string) => {
  let queryString = "";
  // const queryString = 'q=' + encodeURIComponent('react-complete-guide-code in:name');
  if (searchString.trim().length === 0) {
    queryString = `q=per_page=${10}&page=${1}`;
  } else {
    queryString = `q=${encodeURIComponent(
      `${searchString.trim()} in:name`
    )}&per_page=${10}&page=${1}`;
  }

  return api.get(`/search/repositories?${queryString}`).then((res) => {
    return {
      ...res.data,
      items: mapResponseItemToTableData(res.data.items),
    };
  });
};
