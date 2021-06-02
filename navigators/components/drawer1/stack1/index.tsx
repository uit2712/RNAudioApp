import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Draw1NavigationProp } from '../../../config/drawer1';
import { SecondScreenRouteProp, Stack1NavigationProp, Stack1Params } from '../../../config/drawer1/stack1';

const Stack1 = createStackNavigator<Stack1Params>();
function Stack1Navigator() {
    return (
        <Stack1.Navigator initialRouteName='First'>
            <Stack1.Screen
                name='First'
                component={FirstScreen}
            />
            <Stack1.Screen
                name='Second'
                component={SecondScreen}
            />
        </Stack1.Navigator>
    )
}

function FirstScreen() {
    const stack1Nav = useNavigation<Stack1NavigationProp>();
    const drawer1Nav = useNavigation<Draw1NavigationProp>();

    return (
        <View>
            <Text>First screen</Text>
            <TouchableOpacity onPress={() => stack1Nav.navigate('Second', {
                num2: 2,
            })}>
                <Text>Go to second screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer1Nav.navigate('Tab1', {
                    screen: 'Stack2',
                    params: {
                        screen: 'Third',
                        params: {
                            num3: 3,
                        }
                    }
                })
            }}>
                <Text>Go to third screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer1Nav.navigate('Tab1', {
                    screen: 'Stack2',
                    params: {
                        screen: 'Fourth',
                        params: {
                            num4: 4,
                        }
                    }
                })
            }}>
                <Text>Go to fourth screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer1Nav.navigate('Tab1', {
                    screen: 'Tab2',
                    params: {
                        screen: 'Fifth',
                        params: {
                            num5: 5,
                        }
                    }
                })
            }}>
                <Text>Go to fifth screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer1Nav.navigate('Tab1', {
                    screen: 'Tab2',
                    params: {
                        screen: 'Sixth',
                        params: {
                            num6: 6,
                        }
                    }
                })
            }}>
                <Text>Go to sixth screen</Text>
            </TouchableOpacity>
        </View>
    )
}

function SecondScreen() {
    const route = useRoute<SecondScreenRouteProp>();

    return (
        <View>
            <Text>Second screen</Text>
            <Text>{route.params.num2}</Text>
        </View>
    )
}

export default Stack1Navigator;