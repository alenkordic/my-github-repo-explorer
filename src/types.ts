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

export type RepositoriesType = {
  incomplete_results: boolean;
  items: repositoryItemsType[];
  total_count: number;
}