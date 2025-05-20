

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
