import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import React from 'react';

/**
 * 
 * @param toValue number > 0
 * @param duration miliseconds
 */
export function useTranslatedAppName({
    toValue,
    duration,
}: {
    toValue: number,
    duration: number,
}) {
    const appNameTop = useSharedValue(0);
    const animatedAppNameStyle = useAnimatedStyle(() => {
        return {
            top: appNameTop.value,
        }
    });

    const [isAnimatedFinished, setIsAnimatedFinised] = React.useState(false);
    React.useEffect(() => {
        appNameTop.value = withTiming(toValue, {
            duration: duration > 0 ? duration : 1000,
        }, (isFinished: boolean) => {
            if (isFinished === true) {
                runOnJS(finish)();
            }
        });
    }, []);

    function finish() {
        setIsAnimatedFinised(true);
    }

    return {
        animatedAppNameStyle,
        isAnimatedFinished,
    }
}