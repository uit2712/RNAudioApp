import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { IScreenParams } from "../../../route-params";

export interface ISettingsScreenParams extends IScreenParams {
}

export type DrawerSettingsParams = {
    Settings: ISettingsScreenParams;
}

export type DrawerSettingsNavigationProp = DrawerNavigationProp<DrawerSettingsParams>;
export type DrawerSettingsScreenParams = NavigatorScreenParams<DrawerSettingsParams>;