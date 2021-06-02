import { NavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { IScreenParams } from "../../../route-params";

export interface IFirstScreenParams extends IScreenParams {
    num1: number;
}

export interface ISecondScreenParams extends IScreenParams {
    num2: number;
}

export type Stack1Params = {
    First: IFirstScreenParams;
    Second: ISecondScreenParams;
}

export type Stack1NavigationProp = NavigationProp<Stack1Params>;
export type Stack1NavigatorScreenParams = NavigatorScreenParams<Stack1Params>;
export type FirstScreenRouteProp = RouteProp<Stack1Params, 'First'>;
export type SecondScreenRouteProp = RouteProp<Stack1Params, 'Second'>;