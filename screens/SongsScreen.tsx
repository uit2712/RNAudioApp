import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../common/components/Loading';
import { SoundFileType, useGetAllMusicFiles } from '../hooks';
import { SoundPlayerContext } from '../context-api';
import { AvatarHelper } from '../helpers/songs-screen-helpers';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { IMenuSelection } from '../interfaces';
import { navigate } from '../navigators/config/root';

function SoundsScreen() {
    const player = React.useContext(SoundPlayerContext);
    const { listTracks, isLoading } = useGetAllMusicFiles();
    const avatarHelper = new AvatarHelper();
    React.useEffect(() => {
        player.setListSounds(listTracks.map(item => ({
            ...item,
            cover: item.cover !== '' && item.cover !== null && item.cover !== undefined ? item.cover : avatarHelper.getAvatar(),
        })));
    }, [listTracks]);

    if (isLoading === true) {
        return <Loading/>
    }

    return (
        <FlatList
            data={player.listSounds}
            renderItem={({ item, index }) => (
                <ListSoundItem
                    value={item}
                    index={index}
                    isActive={index === player.currentIndex}
                />
            )}
            keyExtractor={item => item.path.toString()}
            // Performance settings
            removeClippedSubviews={true} // Unmount components when outside of window 
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={7} // Reduce the window size
        />
    )
}

function ListSoundItem({
    value,
    index,
    isActive,
}: {
    value: SoundFileType,
    index: number,
    isActive: boolean,
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
        <ListItem
            Component={TouchableOpacity}
            onPress={() => {
                player.playAudio(index);
                navigate('Home', {
                    screen: 'TabSoundPlayerDetail',
                    params: {
                        screen: 'SoundPlayerDetail',
                        params: {
    
                        }
                    }
                })
            }}
            style={{
                backgroundColor: isActive === true ? '#0099ff' : 'white',
                width: '100%',
            }}
            bottomDivider
        >
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
            <Menu>
                <MenuTrigger>
                    <MaterialCommunityIcon
                        name='dots-vertical-circle'
                        size={30}
                    />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption
                        text={value.name}
                        disabled
                        customStyles={{
                            optionText: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black'
                            }
                        }}
                    />
                    {
                        listMenuSelections.map((item: IMenuSelection, index: number) => (
                            <MenuOption
                                key={index}
                                text={item.text}
                                onSelect={() => item.onSelect && item.onSelect()}
                                style={{
                                    paddingVertical: 10,
                                }}
                                customStyles={{
                                    optionText: {
                                        fontSize: 18,
                                    }
                                }}
                            />
                        ))
                    }
                </MenuOptions>
            </Menu>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor: 'grey',
    },
});

export default SoundsScreen;