import * as React from 'react';

import { ICurrentTimeProps, IPlayer } from '@interfaces/index';
import { StyleSheet, Text, View } from 'react-native';

import Slider from '@react-native-community/slider';
import { themeSettings } from '@constants/sound-player-screen';
import { withCurrentTime } from '@hocs/shared/withCurrentTime';

class Progress extends React.Component<ICurrentTimeProps> {
    render() {
        const {
            currentTime,
            currentTimeString,
            player: {
                currentAudioInfo: {
                    duration,
                    durationString,
                },
                pause,
                play,
                seekToTime,
            }
        } = this.props;

        return (
            <View style={styles.progress}>
                <Text style={[styles.processText, {
                    color: themeSettings.textSecondaryColor
                }]}>{currentTimeString}</Text>
                <Slider
                    style={{ flex: 4 }}
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                    onTouchStart={pause}
                    onTouchEnd={play}
                    onSlidingComplete={(seconds: number) => seekToTime(seconds)}
                />
                <Text style={[styles.processText, {
                    color: themeSettings.textSecondaryColor
                }]}>{durationString}</Text>
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

export default withCurrentTime(Progress);