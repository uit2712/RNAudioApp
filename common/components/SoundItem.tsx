import FastImage from 'react-native-fast-image';
import { IMenuSelection } from '@interfaces/index';
import { ListItem } from 'react-native-elements';
import React from 'react';
import SettingsMenu from './SettingsMenu';
import { SoundFileType } from 'types/songs-screen-types';
import { TouchableOpacity } from 'react-native';
import { navigate } from '@navigators/config/root';

function SoundItem({
    value,
    isActive,
    listMenuSelections,
    onPress,
}: {
    value: SoundFileType,
    isActive: boolean,
    listMenuSelections: IMenuSelection[],
    onPress?: () => void,
}) {
    function goToSoundPlayerDetail() {
        onPress && onPress();
        navigate('Home', {
            screen: 'TabSoundPlayerDetail',
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
                backgroundColor: isActive === true ? '#0099ff' : 'white',
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

function SoundItemCover({
    value,
}: {
    value: SoundFileType,
}) {
    return (
        <>
            {
                value.cover && (
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 10, }}
                        source={{
                            uri: value.cover,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                )
            }
        </>
    )
}

function SoundItemInfo({
    value,
    isActive,
}: {
    value: SoundFileType,
    isActive: boolean,
}) {
    return (
        <ListItem.Content>
            <ListItem.Title style={{
                color: isActive === true ? 'white': 'black',
            }}>{value.name}</ListItem.Title>
            {
                (value.other || value.duration) && <ListItem.Subtitle style={{
                    color: isActive === true ? 'white': 'gray',
                    fontSize: 12,
                }}>{`${value.other} - ${value.duration}`}</ListItem.Subtitle>
            }
        </ListItem.Content>
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

export default SoundItem;