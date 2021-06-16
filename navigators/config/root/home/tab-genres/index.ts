import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '@navigators/route-params';
import { NavigatorScreenParams } from '@react-navigation/native';

export interface IGenresScreenParams extends IScreenParams {
}

export type TabGenresParams = {
    Genres?: IGenresScreenParams;
}

export type TabGenresNavigationProp = BottomTabNavigationProp<TabGenresParams>;
export type TabGenresScreenParams = NavigatorScreenParams<TabGenresParams>;