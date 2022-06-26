export interface PropsI {
    value: string;
    onChange: (token: string, isValid: boolean) => void;
}