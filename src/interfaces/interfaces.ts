export interface StateType {
  darkMode: boolean;
  isLoggedIn: any;
  user: any;
}

export interface Action {
  type: string;
  payload?: {} | any;
}

export interface AppContextType {
  state: StateType;
  dispatch: (x: Action) => void;
}

// SEARCH -------------------------------------------------------
export interface RepositoryItem {
  avatar: string;
  description: string;
  id?: number;
  name: string;
  owner: string;
  ownerType: string;
}
export interface SearchRepositoriesResponse {
  incomplete_results: boolean;
  items: RepositoryItem[];
  total_count: number;
  duration: number | undefined;
}

export interface RepositoryItemDetails extends RepositoryItem {
  url?: string;
  ownersUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  watchers?: number;
  forks?: number;
  visibility: string;
  issues?: number;
  duration?: number | undefined;
}

// PROPS
export interface TableProps {
  isDataLoading: boolean;
  repositories: SearchRepositoriesResponse;
  setPage: (s: number) => void;
  setRowsPerPage: (s: number) => void;
  rowsPerPage: number;
  page: number;
  responseTime: number;
}

export interface SearchViewProps extends TableProps {
  onInputChange: (s: string) => void;
  searchInputValue: string;
  searchString: string;
}

