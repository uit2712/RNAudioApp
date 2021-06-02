import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../common/components/Loading';
import { SoundFileType, useGetAllMusicFiles } from '../hooks';
import { SoundPlayerContext } from '../context-api';
import { AvatarHelper } from '../helpers/songs-screen-helpers';
import FastImage from 'react-native-fast-image';

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
    isActive,
}: {
    value: SoundFileType,
    isActive: boolean,
}) {
    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={() => {}}
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
                    (value.author || value.duration) && <ListItem.Subtitle style={{
                        color: isActive === true ? 'white': 'gray',
                        fontSize: 12,
                    }}>{value.author ? `${value.author} - ${value.duration}` : (value.duration ?? '')}</ListItem.Subtitle>
                }
            </ListItem.Content>
            <ListItem.Chevron size={30}/>
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