import { UserInfo } from "../store/auth/auth.interface";

export const setUserInStorage = (user: UserInfo, storage: "local" | "session" = "session") => {
  if (storage === "session") {
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearUserInStorage = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}