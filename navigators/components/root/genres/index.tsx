import * as React from 'react';

import { DrawerGenresParams } from '@navigators/config/root/genres';
import GenresScreen from '@screens/GenresScreen';
import { createStackNavigator } from '@react-navigation/stack';

const DrawerGenres = createStackNavigator<DrawerGenresParams>()

function DrawerGenresNavigator() {
    return (
        <DrawerGenres.Navigator>
            <DrawerGenres.Screen
                name='Genres'
                component={GenresScreen}
            />
        </DrawerGenres.Navigator>
    )
}

export default DrawerGenresNavigator;