import { DrawerHomeNavigationProp } from '@navigators/config/drawer-home';
import FastImage from 'react-native-fast-image';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { IMenuSelection } from '@interfaces/index';
import { ListItem } from 'react-native-elements';
import React from 'react';
import SettingsMenu from '@components/shared/SettingsMenu';
import { TouchableOpacity } from 'react-native';
import { getListSongsByArtistId } from '@functions/artists-screen-function';
import { useDisabledButton } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';

export function ArtistItem({
    value,
}: {
    value: IArtist,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const { disable, enable, isDisabled } = useDisabledButton();
    async function onPress() {
        disable();
        const info = await getListSongsByArtistId(value);
        enable();
        navigation.navigate('TabListSongs', {
            screen: 'ListSongs',
            params: {
                type: 'artist',
                info,
            }
        });
    }

    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={onPress}
            style={{
                width: '100%',
            }}
            bottomDivider
            disabled={isDisabled}
        >
            <FastImage
                style={{ width: 50, height: 50, borderRadius: 10, }}
                source={{
                    uri: value.cover,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <ListItem.Content>
                <ListItem.Title>{value.artist}</ListItem.Title>
                <ListItem.Subtitle>{value.numberOfSongs} Bài hát</ListItem.Subtitle>
            </ListItem.Content>
            <ArtistItemMenu name={value.artist}/>
        </ListItem>
    )
}

function ArtistItemMenu({
    name,
}: {
    name: string,
}) {
    const listMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Trộn' },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Thêm vào danh sách phát' },
        { text: 'Ghim Nghệ sĩ' },
        { text: 'Chia sẻ' },
    ]

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={name}
        />
    )
}

export default ArtistItem;