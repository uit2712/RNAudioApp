import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { FourthScreenRouteProp, Stack2Params, ThirdScreenRouteProp } from "../../../config/drawer1/tab1/stack2";

const Stack2 = createStackNavigator<Stack2Params>();
function Stack2Navigator() {
    return (
        <Stack2.Navigator>
            <Stack2.Screen
                name='Third'
                component={ThirdScreen}
            />
            <Stack2.Screen
                name='Fourth'
                component={FourthScreen}
            />
        </Stack2.Navigator>
    )
}

function ThirdScreen() {
    const route = useRoute<ThirdScreenRouteProp>();

    return (
        <View>
            <Text>Third screen</Text>
            <Text>{route.params.num3}</Text>
        </View>
    )
}

function FourthScreen() {
    const route = useRoute<FourthScreenRouteProp>();

    return (
        <View>
            <Text>Fourth screen</Text>
            <Text>{route.params.num4}</Text>
        </View>
    )
}

export default Stack2Navigator;