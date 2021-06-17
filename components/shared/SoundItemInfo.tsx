import { ISoundFile } from '@interfaces/songs-screen-interfaces';
import { ListItem } from 'react-native-elements';
import React from 'react';

function SoundItemInfo({
    value,
    isActive,
}: {
    value: ISoundFile,
    isActive: boolean,
}) {
    return (
        <ListItem.Content>
            <ListItem.Title style={{
                color: isActive === true ? '#3498DB': 'black',
            }}>{value.name}</ListItem.Title>
            {
                (value.other || value.duration) && <ListItem.Subtitle style={{
                    color: isActive === true ? '#3498DB': 'gray',
                    fontSize: 12,
                }}>{`${value.other} - ${value.duration}`}</ListItem.Subtitle>
            }
        </ListItem.Content>
    )
}

export default SoundItemInfo;