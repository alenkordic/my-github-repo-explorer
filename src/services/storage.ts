const StorageService = {
    setItem: (key: any, valueToStore: any) => {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    getItem: (key: any, initialValue: any) => {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    },
    removeItem: (key: any) => {
      window.localStorage.removeItem(key);
    }
  };
  
  export default StorageService;