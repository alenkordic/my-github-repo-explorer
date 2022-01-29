export type Video = {
    id: number;
    artist: string;
    title: string | number;
    release_year: number;
    genre_id: number;
    image_url: string;
  };
  
  export type Genre = {
    id: number;
    name: string;
  };
  
  export type Filters = {
    queryString: string;
    releaseYear: number;
    genresIDs: number[];
  };
  
  export type TData = {
    videos: Video[];
    genres: Genre[];
  };
  