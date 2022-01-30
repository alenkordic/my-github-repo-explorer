import { repositoryItemsType , repositoryItemType } from "./../types";

export const mapResponseItemToTableData = (
  responseItems: []
): repositoryItemsType[] => {
  return responseItems.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      owner: item.owner.login,
      ownerType: item.owner.type,
      avatar: item.owner.avatar_url,
      description: item.description,
    };
  });
};

export const mapResponseItemToDetailsData = (
  responseItem: any
): repositoryItemType => {

    return {
      id: responseItem.id,
      name: responseItem.name,
      owner: responseItem.owner.login,
      ownerType: responseItem.owner.type,
      ownersUrl:responseItem.owner.html_url,
      avatar: responseItem.owner.avatar_url,
      description: responseItem.description,
      url: responseItem.html_url,
      createdAt: responseItem.created_at,
      updatedAt: responseItem.updated_at,
      watchers: responseItem.watchers_count,
      forks: responseItem.forks_count,
      visibility: responseItem.visibility,
      issues: responseItem.open_issues_count,
    };
};


export const displaySecondsFromMilis = (timestampInMilis:number):number => {
  const timeInSeconds = (timestampInMilis/1000).toFixed(3)
  return  parseFloat(timeInSeconds)
}
