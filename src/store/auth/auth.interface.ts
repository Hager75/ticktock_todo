export interface AuthState {
    userInfo: UserInfo | null ;
    isLoading: boolean;
}

export interface UserInfo {
    id: number;
    firstName: string;
    email: string,
    lastName: string;
    token: string;
    username: string;
    gender: string;
    image: string;
    refreshToken: string;
}