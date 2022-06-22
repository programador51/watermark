export interface AlbumI {
    id: string;
    creationDate: string;
    Customer: {
        id: number;
        name: string;
    }
}

export interface ResDashboardI {
    message: string;
    albums: AlbumI[]
}