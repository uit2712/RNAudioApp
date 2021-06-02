import { DrawerNavigationProp } from "@react-navigation/drawer";
import { IScreenParams } from "../../../route-params";

export interface ISettingsScreenParams extends IScreenParams {
}

export type DrawerSettingsParams = {
    Settings: ISettingsScreenParams;
}

export type DrawerSettingsNavigationProp = DrawerNavigationProp<DrawerSettingsParams>;