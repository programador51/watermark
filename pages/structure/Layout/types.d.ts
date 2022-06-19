export interface UserI {
    email: string;
    name: string;
    image: string;
}

export interface LayoutContext {
    status: "authenticated" | "loading" | "unauthenticated";
    user: null | undefined | UserI;
}