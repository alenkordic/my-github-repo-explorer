export type StateType = {
  darkMode: boolean;
  isLoggedIn: any;
  user: any;
};


export type Action = {
  type: string;
  payload?: {} | any;
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


export type DetailsViewProps = {
  id: number;
  name: string;
  owner: string;
  ownerType: string;
  ownersUrl: string;
  avatar: string;
  description: string;
  url: string;
  search: string;
  createdAt: Date;
  updatedAt: Date;
  watchers: number;
  forks: number;
  visibility: string;
  issues: number;
  duration: number;
}