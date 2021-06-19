import { IAlbum } from '@interfaces/albums-screen-interfaces';

export interface IResponseGetAllAlbumsSelector {
    albums: IAlbum[];
    isLoadFirstTime: boolean;
}