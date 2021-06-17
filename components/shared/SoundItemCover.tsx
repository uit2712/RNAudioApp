import FastImage from 'react-native-fast-image';
import { ISoundFile } from '@interfaces/songs-screen-interfaces';
import React from 'react';

function SoundItemCover({
    value,
}: {
    value: ISoundFile,
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

export default SoundItemCover;