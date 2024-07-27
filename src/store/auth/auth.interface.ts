export interface AuthState {
    userInfo: UserInfo | null ;
    isLoading: boolean;
    profileInfo: ProfileInfo| null ;
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


export interface ProfileInfo extends Partial<UserInfo>  {
    password: number;
    phone: string;
    role: string,
    birthDate: string;
}