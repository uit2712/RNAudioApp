import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { IPlayer } from '@interfaces/index';
import MusicControl from 'react-native-music-control';
import Slider from '@react-native-community/slider';
import { SoundPlayerContext } from '@context-api/index';
import { formatTimeString } from '@functions/index';
import { themeSettings } from '@constants/sound-player-screen';

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

const styles = StyleSheet.create({
    progress: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processText: {
        flex: 1,
        textAlign: 'center',
    },
})

export default Progress;