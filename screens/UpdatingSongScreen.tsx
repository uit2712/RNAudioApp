import * as React from 'react';

import { Text, View } from 'react-native';

import { DrawerHomeContext } from '@context-api/index';
import { useCustomBackButton, } from '@hooks/index';

function UpdatingSongScreen() {
    const { setIsShowTabBar, setIsShowMiniPlayer } = React.useContext(DrawerHomeContext);

    useCustomBackButton(() => {
        setIsShowTabBar(true);
        setIsShowMiniPlayer(true);
    });

    return (
        <View>
            <Text>description</Text>
        </View>
    )
}

export default UpdatingSongScreen;