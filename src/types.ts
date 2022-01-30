export type StateType = {
  darkMode: boolean;
  isAuthenticatedUser: boolean;
};

export type Action = {
  type: string;
  payload?: {};
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