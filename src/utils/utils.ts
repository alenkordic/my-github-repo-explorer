import { repositoryItemsType } from "./../types";

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


export function debounce<A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number
): [(args: A) => Promise<R>, () => void] {
    let timer: NodeJS.Timeout;

    const debouncedFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resolve(fn(args));
            }, ms);
        });

    const teardown = () => clearTimeout(timer);

    return [debouncedFunc, teardown];
}
