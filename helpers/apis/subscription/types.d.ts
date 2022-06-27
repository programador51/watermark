export interface TokenPayPalI {
    "scope": string;
    "access_token": string;
    "token_type": string;
    "app_id": string;
    "expires_in": number;
    "nonce": string;
}

export interface DtoPaypalOc {
    id: string;
    links: PaypalLinkOcI[],
    status: string;
}

export interface PaypalLinkOcI {
    href: string;
    method: string;
    rel: string
}