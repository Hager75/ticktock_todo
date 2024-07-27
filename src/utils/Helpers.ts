import { Task } from "../features/Todo/Todo.interface";
import { UserInfo } from "../store/auth/auth.interface";
import { LOCAL_STORAGE_KEY } from "./Constants";
import { Data, StorageType } from "./interfaces";

export const setUserInStorage = (user: UserInfo, storage: StorageType) => {
  if (storage === StorageType.Session) {
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUserInfoInStorage = ():UserInfo => {
  return JSON.parse(localStorage.getItem("user") as string) ||
    JSON.parse(sessionStorage.getItem("user") as string) ||
    null;
};

export const clearUserInStorage = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}

export const convertData = <T extends Data>(data: T) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value) {
      if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  })
  return formData
}

export const getStorageType = (): StorageType => {
  return localStorage.getItem("user") ? StorageType.Local : StorageType.Session;
};

export const getTaskListStorage = (): Task[] =>  {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
}