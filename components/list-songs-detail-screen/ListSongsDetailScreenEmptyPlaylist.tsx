import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import LinearGradient from 'react-native-linear-gradient';
import { ListSongsDetailType } from 'types/index';
import React from 'react';
import { useGetPlaylistByIdSelector } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/native';

function ListSongsDetailScreenEmptyPlaylist({
    type,
    playlist,
}: {
    type: ListSongsDetailType,
    playlist?: IPlaylist,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const currentPlaylist = useGetPlaylistByIdSelector(playlist?.id ?? '');


    if (!currentPlaylist || type !== 'custom-playlist') {
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Fontisto
                    name='applemusic'
                    size={50}
                    style={{
                        marginBottom: 10,
                    }}
                />
                <Text>Không tìm thấy bài hát nào</Text>
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 18, marginBottom: 10, }}>Không có bài hát nào trong danh sách phát</Text>
            <TouchableOpacity
                style={{ width: '80%', marginBottom: 10, }}
                onPress={() => {
                    navigation.navigate('TabSongsAddition', {
                        screen: 'SongAddition',
                        params: {
                            screen: 'All',
                            params: {
                                playlist,
                            }
                        }
                    })
                }}
            >
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Thêm bài hát
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default ListSongsDetailScreenEmptyPlaylist;