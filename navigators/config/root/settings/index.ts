import { DrawerNavigationProp } from "@react-navigation/drawer";
import { IScreenParams } from "../../../route-params";
import { NavigatorScreenParams } from "@react-navigation/native";

export interface ISettingsScreenParams extends IScreenParams {
}

export type DrawerSettingsParams = {
    Settings: ISettingsScreenParams;
}

export type DrawerSettingsNavigationProp = DrawerNavigationProp<DrawerSettingsParams>;
export type DrawerSettingsScreenParams = NavigatorScreenParams<DrawerSettingsParams>;