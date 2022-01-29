import axios from "axios";
import {mapResponseItemToTableData} from "./../utils/utils"

const api = axios.create({
    baseURL: "https://api.github.com/"
})

export const getRepositories = (page: number, rowsPerPage: number, searchString:string) => {
  // return api.get("/search/repositories?q=my-github-repo-explorer&per_page=20&page=1").then(res => res.data)


  const queryString = 'q=' + encodeURIComponent('react-complete-guide-code in:name');
  // const queryString = 'q=' + encodeURIComponent(`${searchString} in:name`);

  //  return api.get(`/search/repositories?${queryString}&per_page=20&page=1`).then(res => res.data)

   return api.get(`/search/repositories?${queryString}&per_page=${rowsPerPage}&page=${page+1}`).then(res => {
     return {
       ...res.data,
       items: mapResponseItemToTableData(res.data.items)
     }
   } )


};
