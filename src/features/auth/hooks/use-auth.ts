import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router';

import { useUserContext } from "@shared/user-context";

import {
    OnLogin,
    OnSingIn,
    OnSingUp,
    LoginMutationResponse,
    AddUserMutationResponse,
    MyProfileQueryResponse
} from "../typedef";


const CREATE_USER_MUTATION = gql`
    mutation AddUser(
        $email: String!
        $password: String!
        $name: String!
        $avatar: String!
    ) {
        addUser(
            data: {
                name: $name
                email: $email
                password: $password
                avatar: $avatar
            }
        ) {
            id
            name
            avatar
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation Login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            access_token
            refresh_token
        }
    }
`;

const GET_MY_PROFILE = gql`
    query MyProfile {
        myProfile {
            id
            name
            avatar
        }
    }
`


export const useAuth = () => {
    const navigate = useNavigate();

    const { onSetUser } = useUserContext();

    const [onSingUpMutation] = useMutation<AddUserMutationResponse>(
        CREATE_USER_MUTATION
    );

    const [onLoginMutation] = useMutation<LoginMutationResponse>(
        LOGIN_MUTATION
    );

    const { refetch: refetchProfile } = useQuery<MyProfileQueryResponse>(GET_MY_PROFILE, {
        skip: true,
    });

    const onLogin: OnLogin = async (data) => {
        localStorage.removeItem('AUTH_TOKENS');

        const result = await onLoginMutation({
            variables: {
                ...data,
            }
        });

        if (!result.data || !result.data.login) {
            throw new Error("Login failed: No data returned from server.");
        }

        const access = result.data.login.access_token;
        const refresh = result.data.login.refresh_token;

        localStorage.setItem('AUTH_TOKENS', JSON.stringify({
            access,
            refresh,
        }));

        return {
            access,
            refresh,
        }
    }

    const onSingUp: OnSingUp = async (data) => {
        const result = await onSingUpMutation({
            variables: {
                ...data,
                avatar: 'https://api.lorem.space/image/face?w=150&h=220',
            }
        });

        if (!result.data || !result.data.addUser) {
            throw new Error("Sign up failed: No data returned from server.");
        }

        onSetUser({
            id: result.data.addUser.id,
            name: result.data.addUser.name,
            avatar: result.data.addUser.avatar,
            email: data.email,
        });

        await onLogin({
            email: data.email,
            password: data.password,
        });

        navigate('/');
    };

    const onSingIn: OnSingIn = async (data) => {
        await onLogin(data);

        const result = await refetchProfile();

        onSetUser({
            id: result.data.myProfile.id,
            name: result.data.myProfile.name,
            avatar: result.data.myProfile.avatar,
            email: data.email,
        });

        navigate('/');
    };

    return {
        onSingUp,
        onSingIn
    };
};
