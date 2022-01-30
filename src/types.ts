export type StateType = {
  darkMode: boolean;
  isLoggedIn: any;
  user: any;
  client_id: any;
  redirect_uri: any;
  client_secret: any;
  proxy_url: any;
  // darkMode: boolean;
  // isLoggedIn: string | null;
  // user: string | null;
  // client_id: string;
  // redirect_uri: string;
  // client_secret: string;
  // proxy_url: string;
};


export type Action = {
  type: string;
  payload: {} | any;
};

export type AppContextType = {
  state: StateType;
  dispatch: (x: Action) => void;
};

export type repositoryItemsType = {
  avatar: string;
  description: string;
  id: number;
  name: string;
  owner: string;
  ownerType: string;
}
export type repositoryItemType = {
  avatar: string;
  description: string;
  id: number;
  name: string;
  owner: string;
  ownerType: string;
  url: string;
  ownersUrl: string;
  createdAt: string;
  updatedAt: string;
  watchers: number;
  forks: number;
  visibility: number;
  issues: number;
}

export type RepositoriesType = {
  incomplete_results: boolean;
  items: repositoryItemsType[];
  total_count: number;
}