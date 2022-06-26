export interface JwtI {
    user: {
        /**
 * Id of the user
 */
        id: number;
        defaultWatermark: string;
        logInMethod: string;
        profilePicture: string;
        registrationDate: string;
        subscrption: null | string;
        email: string;
        iat: number;
        exp: number;
    }
}