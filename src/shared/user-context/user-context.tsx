import React, { useMemo, createContext, useState, useContext } from 'react';

import { User } from '../typedef';

type OnChangeUser = (userParams: Partial<User>) => void;

type OnSetUser = (user: User | null) => void;

type UserContext = {
    user: User | null;
    onChangeUser: OnChangeUser;
    onSetUser: OnSetUser;
};

const DEFAULT_USER_CONTEXT: UserContext = {
    user: null,
    onChangeUser: () => undefined,
    onSetUser: () => undefined,
};

const Context = createContext<UserContext>(DEFAULT_USER_CONTEXT);

export const useUserContext = () => useContext(Context);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const onChangeUser: OnChangeUser = (userParams) => {
        setUser((prev) => prev ? { ...prev, ...userParams } : prev);
    };

    const onSetUser: OnSetUser = (user) => {
        setUser(user);
    };

    const value = useMemo(() => ({
        user,
        onChangeUser,
        onSetUser
    }), [user]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
