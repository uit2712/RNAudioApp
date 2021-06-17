import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext, } from '@context-api/index';
import { ImageBackground, StyleSheet, View, } from 'react-native';

import Common from '@components/sound-player-screen/Common';
import FastImage from 'react-native-fast-image';
import OtherActions from '@components/sound-player-screen/OtherActions';
import Progress from '@components/sound-player-screen/Progress';
import { useCustomBackButton, } from '@hooks/index';

function SoundPlayerScreen() {
    const { setIsShowTabBar, setIsShowMiniPlayer } = React.useContext(DrawerHomeContext);

    useCustomBackButton(() => {
        setIsShowTabBar(true);
        setIsShowMiniPlayer(true);
    });

    const player = React.useContext(SoundPlayerContext);
    if (!player.currentAudioInfo) {
        return null;
    }

    return (
        <ImageBackground
            source={require('../images/sound-player-detail-background.jpg')}
            style={styles.backgroundImage}
            blurRadius={10}
        >
            <View style={styles.container}>
                <FastImage
                    source={{
                        uri: player.currentAudioInfo.cover,
                        priority: FastImage.priority.normal,
                    }}
                    style={styles.cover}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Common />
                <Progress />
                <OtherActions />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch'
    },
    cover: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginTop: 20,
    },
})

export default SoundPlayerScreen;