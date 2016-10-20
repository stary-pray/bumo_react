const hasLocalStorage = !!window['localStorage'];

export const setItem = async (key, value)=> {
  if(hasLocalStorage){
    localStorage.setItem(key, value);
  } else {
    const AsyncStorage = window['BumoAsyncStorage'];
    await AsyncStorage.setItem(key, value);
  }
};

export const getItem = async (key)=> {
  if(hasLocalStorage){
    return localStorage.getItem(key);
  } else {
    const AsyncStorage = window['BumoAsyncStorage'];
    return await AsyncStorage.getItem(key);
  }
};


export const removeItem = async (key)=> {
  if(hasLocalStorage){
    return localStorage.removeItem(key);
  } else {
    const AsyncStorage = window['BumoAsyncStorage'];
    return await AsyncStorage.removeItem(key);
  }
};
