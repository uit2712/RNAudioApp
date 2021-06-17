import * as React from 'react';

import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import { FAB } from 'react-native-elements';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListSongsDetailType } from 'types/index';
import { useNavigation } from '@react-navigation/native';

function CustomListButtonAdd({
    type,
    playlist,
}: {
    type: ListSongsDetailType,
    playlist?: IPlaylist,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    
    return (
        <>
            {
                type === 'custom-playlist' && (
                    <FAB
                        title='Thêm bài hát'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                        }}
                        icon={
                            <Ionicons
                                name='add'
                                size={30}
                                color='white'
                            />
                        }
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
                    />
                )
            }
        </>
    )
}

export default CustomListButtonAdd;