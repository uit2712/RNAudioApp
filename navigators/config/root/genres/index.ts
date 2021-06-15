import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IScreenParams } from '@navigators/route-params';
import { NavigatorScreenParams } from '@react-navigation/native';

export interface IGenresScreenParams extends IScreenParams {
}

export type DrawerGenresParams = {
    Genres?: IGenresScreenParams;
}

export type DrawerGenresNavigationProp = DrawerNavigationProp<DrawerGenresParams>;
export type DrawerGenresScreenParams = NavigatorScreenParams<DrawerGenresParams>;