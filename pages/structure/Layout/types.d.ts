export interface UserI {
    email: string;
    name: string;
    image: string;
}

export interface LayoutContext {
    status: "authenticated" | "loading" | "unauthenticated";
    user: null | undefined | UserI;
}

export interface JwtAuthI {
    /**
     * Flag that indicates if the user can access to the protected system
     */
    isAuthenticated: boolean;

    /**
     * Message that indicates the response of the authentication
     */
    message: string;
}