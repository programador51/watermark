export interface ContextSessionI extends useSessionValuesI {
    isFetched: boolean;
}

export interface useSessionValuesI {
    /**
     * Username of the user loged in
     */
    userName: string | undefined;

    /**
     * Email of the user loged in
     */
    email: string | undefined;

    /**
     * Update the session once the page loads in order the display the UI
     * @param {string|undefined} userName - Username for the login session
     * @param {string|undefined} email - Email for the login session
     */
    updateSession: (userName: string | undefined,
        email: string | undefined) => void;
}