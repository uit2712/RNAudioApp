import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Stack1NavigatorScreenParams } from "./stack1";
import { Tab1NavigationScreenParams } from "./tab1";

export type Draw1Params = {
    Stack1: Stack1NavigatorScreenParams;
    Tab1: Tab1NavigationScreenParams;
}

export type Draw1NavigationProp = DrawerNavigationProp<Draw1Params>;