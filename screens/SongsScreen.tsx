import * as React from 'react';

import { TouchableOpacity, VirtualizedList, } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IMenuSelection } from '@interfaces/index';
import { ListItem } from 'react-native-elements';
import SettingsMenu from '@common/components/SettingsMenu';
import { SoundFileType } from '../types/songs-screen-types';
import { SoundPlayerContext } from '@context-api/index';
import { navigate } from '@navigators/config/root';
import { useGetAllSongsSelector } from '../store/selectors/songs-screen-selectors';

function SoundsScreen() {
    const { player } = useGetPlayerInfo();

    return (
        <VirtualizedList
            data={player.listSounds}
            renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                <Sound
                    key={item.id}
                    value={item}
                    index={index}
                    isActive={index === player.currentIndex}
                />
            )}
            keyExtractor={item => item.path.toString()}
            initialNumToRender={7} // Reduce initial render amount
            getItemCount={(data: SoundFileType[]) => data.length}
            getItem={(data: SoundFileType[], index: number) => data[index]}
        />
    )
}

function useGetPlayerInfo() {
    const { songs } = useGetAllSongsSelector();
    const player = React.useContext(SoundPlayerContext);
    React.useEffect(() => {
        player.setListSounds(songs);
    }, [songs]);

    return {
        player,
    }
}

export function Sound({
    value,
    index,
    isActive,
}: {
    value: SoundFileType,
    index: number,
    isActive: boolean,
}) {
    const player = React.useContext(SoundPlayerContext);

    function goToSoundPlayerDetail() {
        // setIsShowTabBar(false);
        // player.playAudio(index);
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
            <SoundCover value={value}/>
            <SoundInfo value={value} isActive={isActive}/>
            <SoundMenu value={value} index={index}/>
        </ListItem>
    )
}

function SoundCover({
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

function SoundInfo({
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

function SoundMenu({
    value,
    index,
}: {
    value: SoundFileType,
    index: number,
}) {
    const player = React.useContext(SoundPlayerContext);
    const listMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.playAudio(index) },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Thêm vào danh sách phát' },
        { text: 'Thêm vào Mục ưa thích' },
        { text: 'Đặt làm nhạc chuông' },
        { text: 'Xóa' },
    ]

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={value.name}
        />
    )
}

export default SoundsScreen;