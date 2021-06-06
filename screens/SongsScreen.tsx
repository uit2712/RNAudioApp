import * as React from 'react';
import { FlatList, TouchableOpacity, } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../common/components/Loading';
import { SoundFileType, useGetAllMusicFiles } from '../hooks';
import { SoundPlayerContext } from '../context-api';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuOption, } from 'react-native-popup-menu';
import { IMenuSelection } from '../interfaces';
import { navigate } from '../navigators/config/root';
import CustomMenu from '../common/components/CustomMenu';
import { avatarHelper } from '../helpers/songs-screen-helpers';

function SoundsScreen() {
    const { isLoading, player } = useGetPlayerInfo();

    if (isLoading === true) {
        return <Loading/>
    }

    return (
        <FlatList
            data={player.listSounds}
            renderItem={({ item, index }) => (
                <Sound
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

function useGetPlayerInfo() {
    const player = React.useContext(SoundPlayerContext);
    const { listTracks, isLoading } = useGetAllMusicFiles();
    // console.log(listTracks);
    React.useEffect(() => {
        player.setListSounds(listTracks.map(item => ({
            ...item,
            cover: item.cover ?? avatarHelper.getAvatar(),
        })));
    }, [listTracks]);

    return {
        player,
        isLoading,
    }
}

function Sound({
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
        player.playAudio(index);
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
        <CustomMenu
            listMenuSelections={listMenuSelections}
            triggerComponent={() => (
                <MaterialCommunityIcon
                    name='dots-vertical-circle'
                    size={30}
                />
            )}
            headerComponent={() => (
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
            )}
        />
    )
}

export default SoundsScreen;