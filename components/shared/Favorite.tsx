import { StyleProp, ViewStyle } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { SoundPlayerContext } from '@context-api/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFavorite } from '@hooks/index';

function Favorite({
    activeColor,
    inactiveColor,
    customStyle,
}: {
    activeColor: string,
    inactiveColor: string,
    customStyle?: StyleProp<ViewStyle>,
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress } = useFavorite(player.currentAudioInfo.originalInfo);

    return (
        <TouchableOpacity
            style={customStyle}
            onPress={onFavoritePress}
        >
            <AntDesign
                name={ isFavorite ? 'heart' : 'hearto' }
                size={30}
                color={isFavorite ? activeColor : inactiveColor}
            />
        </TouchableOpacity>
    )
}

export default Favorite;