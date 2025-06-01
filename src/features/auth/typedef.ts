import { User } from "@shared/typedef";


type SingUpParams = {
    name: string;
    email: string;
    password: string;
};

export type OnSingUp = (params: SingUpParams) => Promise<void>;

type LoginParams = {
    email: string;
    password: string;
};

type LoginResponse = {
    access: string;
    refresh: string;
};

export type OnLogin = (params: LoginParams) => Promise<LoginResponse>;

export type SingInParams = {
    email: string;
    password: string;
}

export type OnSingIn = (params: SingInParams) => Promise<void>;

export type AuthTokens = {
    access_token: string;
    refresh_token: string;
};

export type LoginMutationResponse = {
    login: AuthTokens;
};

export type AddUserMutationResponse = {
    addUser: User;
};

export type MyProfileQueryResponse = {
    myProfile: User;
};