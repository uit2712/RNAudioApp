import { ICurrentTimeProps, IPlayer } from '@interfaces/index';

import React from 'react';
import { SoundPlayerContext } from '@context-api/index';
import { formatTimeString } from '@functions/index';

export function withCurrentTime(WrappedComponent: React.ComponentType<ICurrentTimeProps>, onUpdateTime?: () => void) {
    class CurrentTime extends React.Component {
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
                            onUpdateTime && onUpdateTime();
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
            return (
                <WrappedComponent
                    currentTime={this.state.currentTime}
                    currentTimeString={this.state.currentTimeString}
                    player={this.context}
                />
            )
        }
    }

    CurrentTime.contextType = SoundPlayerContext;
    return CurrentTime;
}