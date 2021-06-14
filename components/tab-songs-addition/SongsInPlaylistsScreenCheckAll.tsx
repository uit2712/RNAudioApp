import { Text, View } from 'react-native';

import { CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

function SongsInPlaylistsScreenCheckAll({
    isChecked,
    checkAll,
}: {
    isChecked: boolean,
    checkAll: () => void,
}) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ flex: 0.5, marginLeft: 15, }}>
                <Text style={{ fontSize: 18, }}>Chọn tất cả</Text>
            </View>
            <View style={{ flex: 0.5, marginRight: 15,  }}>
                <CheckBox
                    right
                    checkedIcon={
                        <MaterialIcons
                            name='check-box'
                            size={30}
                        />
                    }
                    uncheckedIcon={
                        <MaterialIcons
                            name='check-box-outline-blank'
                            size={30}
                        />
                    }
                    checked={isChecked}
                    onPress={checkAll}
                />
            </View>
        </View>
    )
}

export default SongsInPlaylistsScreenCheckAll;