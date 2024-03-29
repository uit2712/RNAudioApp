import { DrawerHomeContext } from '@context-api/index';
import { IMenuSelection } from '@interfaces/index';
import { ListItem } from 'react-native-elements';
import React from 'react';
import SettingsMenu from '@components/shared/SettingsMenu';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItemCover from '@components/shared/SoundItemCover';
import SoundItemInfo from '@components/shared/SoundItemInfo';
import { TouchableOpacity } from 'react-native';
import { navigate } from '@navigators/config';

interface ISoundItemProps {
    value: SoundFileType,
    isActive: boolean,
    listMenuSelections: IMenuSelection[],
    onPress?: () => void,
}
function SoundItem({
    value,
    isActive,
    listMenuSelections,
    onPress,
}: ISoundItemProps) {
    const { setIsShowTabBar, setIsShowMiniPlayer } = React.useContext(DrawerHomeContext);

    function goToSoundPlayerDetail() {
        setIsShowTabBar(false);
        setIsShowMiniPlayer(false);
        onPress && onPress();
        navigate('Home', {
            screen: 'TabOthers',
            params: {
                screen: 'SoundPlayerDetail',
                params: {

                }
            }
        });
    }

    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={goToSoundPlayerDetail}
            style={{
                width: '100%',
            }}
            bottomDivider
        >
            <SoundItemCover value={value}/>
            <SoundItemInfo value={value} isActive={isActive}/>
            <SoundItemMenu value={value} listMenuSelections={listMenuSelections}/>
        </ListItem>
    )
}

function SoundItemMenu({
    value,
    listMenuSelections,
}: {
    value: SoundFileType,
    listMenuSelections: IMenuSelection[],
}) {
    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={value.name}
        />
    )
}

function areEqual(prevProps: ISoundItemProps, nextProps: ISoundItemProps) {
    return prevProps.value.id === nextProps.value.id && prevProps.isActive !== nextProps.isActive;
}

export default React.memo(SoundItem, areEqual);