import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SoundPlayerContext } from '@context-api/index';
import { themeSettings } from '@constants/sound-player-screen';

function Common() {
    const player = React.useContext(SoundPlayerContext);
    if (!player.currentAudioInfo) {
        return null;
    }

    return (
        <View style={styles.common}>
            <View style={styles.commonIcon}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name='playlist-plus'
                        size={30}
                        style={{ textAlign: 'center' }}
                        color={themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.commonSongInfo}>
                <Text style={[styles.commonSongInfoName, {
                    color: themeSettings.textColor
                }]}>{player.currentAudioInfo.name}</Text>
                <Text style={{
                    color: themeSettings.textSecondaryColor
                }}>{player.currentAudioInfo.other}</Text>
            </View>
            <View style={styles.commonIcon}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name='playlist-music'
                        size={30}
                        style={{ textAlign: 'center' }}
                        color={themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    common: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    commonIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
    },
    commonSongInfo: {
        flex: 4,
        alignItems: 'center',
    },
    commonSongInfoName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Common;