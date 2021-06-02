import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Draw1NavigationProp } from "..";
import { FifthScreenRouteProp, SixthScreenRouteProp, Tab2Params } from "../../../config/drawer1/tab1/tab2";

const Tab2 = createBottomTabNavigator<Tab2Params>();
function Tab2Navigator() {
    return (
        <Tab2.Navigator>
            <Tab2.Screen
                name='Fifth'
                component={FifthScreen}
            />
            <Tab2.Screen
                name='Sixth'
                component={SixthScreen}
            />
        </Tab2.Navigator>
    )
}

function FifthScreen() {
    const drawer1Nav = useNavigation<Draw1NavigationProp>();
    const route = useRoute<FifthScreenRouteProp>();

    return (
        <View>
            <Text>Fifth screen</Text>
            <Text>{route.params.num5}</Text>
            <TouchableOpacity onPress={() => {
                drawer1Nav.navigate('Stack1', {
                    screen: 'Second',
                    params: {
                        num2: 2,
                    }
                })
            }}>
                <Text>Go to second screen</Text>
            </TouchableOpacity>
        </View>
    )
}

function SixthScreen() {
    const route = useRoute<SixthScreenRouteProp>();

    return (
        <View>
            <Text>Sixth screen</Text>
            <Text>{route.params.num6}</Text>
        </View>
    )
}

export default Tab2Navigator;