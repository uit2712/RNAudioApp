import * as React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../common/components/Loading';
import { SoundFileType, useGetAllMusicFiles } from '../hooks';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';
import { SoundPlayerContext } from '../context-api';

function SoundsScreen() {
    const player = React.useContext(SoundPlayerContext);
    const { listTracks, isLoading } = useGetAllMusicFiles();
    React.useEffect(() => {
        player.setListSounds(listTracks);
    }, [listTracks]);

    if (isLoading === true) {
        return <Loading/>
    }

    return (
        <ScrollView style={styles.container}>
            {
                listTracks.map((value: SoundFileType, index: number) => 
                    <ListSoundItem
                        key={index}
                        value={value}
                        isActive={index === player.currentIndex}
                    />
                )
            }
        </ScrollView>
    )
}

function ListSoundItem({
    value,
    isActive,
}: {
    value: SoundFileType,
    isActive: boolean,
}) {
    // const navigation = useNavigation<MyNavigationProp>();

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
            <FontistoIcon
                name='music-note'
                size={30}
                color={isActive === true ? 'white': 'black'}
            />
            <ListItem.Content>
                <ListItem.Title style={{
                    color: isActive === true ? 'white': 'black',
                }}>{value.name}</ListItem.Title>
                {
                    value.author && <ListItem.Subtitle style={{
                        color: isActive === true ? 'white': 'black',
                    }}>{value.author}</ListItem.Subtitle>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SoundsScreen;