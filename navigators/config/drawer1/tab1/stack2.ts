import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { IScreenParams } from "../../../route-params";

export interface IThirdScreenParams extends IScreenParams {
    num3: number;
}

export interface IFourthScreenParams extends IScreenParams {
    num4: number;
}

export type Stack2Params = {
    Third: IThirdScreenParams;
    Fourth: IFourthScreenParams;
}

export type Stack2NavigationProp = StackNavigationProp<Stack2Params>;
export type Stack2NavigatorScreenParams = NavigatorScreenParams<Stack2Params>;
export type ThirdScreenRouteProp = RouteProp<Stack2Params, 'Third'>;
export type FourthScreenRouteProp = RouteProp<Stack2Params, 'Fourth'>;