import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext, } from '@context-api/index';
import { ImageBackground, StyleSheet, Text, View, } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IPlayer } from '@interfaces/index';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicControl from 'react-native-music-control';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatTimeString } from '@functions/index';
import { useHomeBottomTabHelper } from '@hooks/index';

const themeSettings = {
    iconDefaultColor: 'white',
    iconActiveColor: 'rgb(255, 153, 51)',
    textColor: 'white',
    textSecondaryColor: 'rgb(191, 191, 191)',
}

function SoundPlayerScreen() {
    const { setIsShowTabBar, setIsShowMiniPlayer } = React.useContext(DrawerHomeContext);
    useHomeBottomTabHelper({
        onBack: () => {
            setIsShowTabBar(true);
            setIsShowMiniPlayer(true);
        },
        onFocus: () => {
            setIsShowTabBar(false);
            setIsShowMiniPlayer(false);
        }
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

function Common() {
    const player = React.useContext(SoundPlayerContext);
    if (!player.currentAudioInfo) {
        return null;
    }

    return (
        <View style={styles.common}>
            <View style={styles.commonIcon}>
                <TouchableOpacity>
                    <MaterialCommunityIcon
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
                    <MaterialCommunityIcon
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

class Progress extends React.Component {
    static contextType = SoundPlayerContext;
    isComponentUnmounted: boolean = false;
    state = {
        currentTime: 0,
        currentTimeString: formatTimeString(0),
    }

    interval: any;
    componentDidMount() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                const context = this.context as IPlayer;
                context.getCurrentTime((currentTime: number, isPlaying: boolean) => {
                    if (isPlaying && this.isComponentUnmounted === false) {
                        this.setState(prevState => ({
                            currentTime,
                            currentTimeString: formatTimeString(currentTime * 1000),
                        }));
                        MusicControl.updatePlayback({
                            elapsedTime: currentTime, 
                        });
                    }
                })
            }, 100);
        }
    }
    
    componentWillUnmount() {
        this.isComponentUnmounted = true;
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        const context = this.context as IPlayer;

        return (
            <View style={styles.progress}>
                <Text style={[styles.processText, {
                    color: themeSettings.textSecondaryColor
                }]}>{this.state.currentTimeString}</Text>
                <Slider
                    style={{ flex: 4 }}
                    value={this.state.currentTime}
                    minimumValue={0}
                    maximumValue={this.context.currentAudioInfo.duration}
                    onTouchStart={context.pause}
                    onTouchEnd={context.play}
                    onSlidingComplete={(seconds: number) => context.seekToTime(seconds)}
                />
                <Text style={[styles.processText, {
                    color: themeSettings.textSecondaryColor
                }]}>{this.context.currentAudioInfo.durationString}</Text>
            </View>
        )
    }
}

function OtherActions () {
    const player = React.useContext(SoundPlayerContext);

    return (
        <View style={styles.otherActions}>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.loop}>
                    <MaterialCommunityIcon
                        name='repeat'
                        size={30}
                        color={player.isLoop ? themeSettings.iconActiveColor : themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.previous}>
                    <AntDesignIcon
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
                            <AntDesignIcon
                                name='pausecircle'
                                size={40}
                                color={themeSettings.iconDefaultColor}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={player.play}>
                            <AntDesignIcon
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
                    <AntDesignIcon
                        name='stepforward'
                        size={30}
                        color={themeSettings.iconDefaultColor}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherActionItem}>
                <TouchableOpacity onPress={player.shuffle}>
                    <FeatherIcon
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
    progress: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processText: {
        flex: 1,
        textAlign: 'center',
    },
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

export default SoundPlayerScreen;