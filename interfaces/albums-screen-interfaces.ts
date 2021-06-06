export interface IAlbum {
    id: string;
    album: string;
    author: string;
    cover?: string;
    numberOfSongs: number | string;
}