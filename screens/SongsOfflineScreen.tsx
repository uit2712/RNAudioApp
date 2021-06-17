import * as React from 'react';

import {
    SectionList,
} from 'react-native';
import SongsOfflineSection from '@components/songs-offline-screen/SongsOfflineSection';
import { SongsOfflineSectionItemType, } from 'types/songs-offline-screen-types';
import { useGetSectionsData } from '@hooks/songs-offline-screen-hooks';

function SongsOfflineScreen() {
    const data = useGetSectionsData();

    return (
        <SectionList
            sections={data}
            renderItem={(props) => (
                <SongsOfflineSection key={props.section.type} {...props} />
            )}
            renderSectionHeader={({ section }) => (
                section.data.length > 0 ? <section.headerComponent/> : null
            )}
            keyExtractor={(item: SongsOfflineSectionItemType, index: number) => `${index}`}
        />
    )
}

export default React.memo(SongsOfflineScreen);