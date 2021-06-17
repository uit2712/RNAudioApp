import * as React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SoundPlayerContext } from '@context-api/index';
import { themeSettings } from '@constants/sound-player-screen';

function OtherActions () {
    const player = React.useContext(SoundPlayerContext);

    return (
        <View style={styles.otherActions}>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.loop}>
                    <MaterialCommunityIcons
                        name='repeat'
                        size={30}
                        color={player.isLoop ? themeSettings.iconActiveColor : themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.previous}>
                    <AntDesign
                        name='stepbackward'
                        size={30}
                        color={themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherActionItem}>
                {
                    player.status === 'play' ? (
                        <TouchableOpacity onPress={player.pause}>
                            <AntDesign
                                name='pausecircle'
                                size={40}
                                color={themeSettings.iconDefaultColor}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={player.play}>
                            <AntDesign
                                name='play'
                                size={40}
                                color={themeSettings.iconDefaultColor}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.next}>
                    <AntDesign
                        name='stepforward'
                        size={30}
                        color={themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.shuffle}>
                    <Feather
                        name='shuffle'
                        size={30}
                        color={player.isShuffle ? themeSettings.iconActiveColor : themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    otherActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    otherActionItem: {
        flex: 1,
        alignItems: 'center',
    },
})

export default OtherActions;