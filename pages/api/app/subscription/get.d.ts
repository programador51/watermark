import { JwtI } from "middlewares/types";

export interface DtoGetSubscription extends JwtI {

}

export interface ResGetSubscriptionI {
    /**
     * Indicates if the user has premium account
     */
    isSubscribed: boolean;

    /**
     * Indicates the date until the user can be keep using the account in order to create more watermarked photos
     */
    date: string;
}