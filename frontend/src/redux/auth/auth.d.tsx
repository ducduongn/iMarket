export type UserResponse = {
    email: string;
    is_verified: boolean;
};

export type UserResponseError = Record<'password' | 'email', string[]>;

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponseError = Record<'password' | 'email', string[]>;

export type LoginResponse = {
    user: UserResponse;
    token: string;
};

export type SignupRequest = LoginRequest & {
    firstName: string;
    lastName: string;
};

export type SignupResponse = LoginResponse & {
    verify_link: string;
};

export type SignupResponseError = LoginResponseError;

// -------------------------------
export type AuthState = {
    token: string | undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserResponse | null;
    errors: LoginResponseError | null;
};
