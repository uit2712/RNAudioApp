import * as React from 'react';

import { IBottomSheetSectionWithType, ISortByBottomSheetContextWithType } from '@interfaces/index';

import SortByBottomSheet from '@components/shared/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { useSortByBottomSheetSettings } from '@hooks/index';

function withBottomSheet(WrappedComponent: React.ComponentType<{ settings: ISortByBottomSheetContextWithType<any> }>, useGetListDataInBottomSheet: () => IBottomSheetSectionWithType<any>[]) {
    return function () {
        const listDataInBottomSheet = useGetListDataInBottomSheet();
        const settings = useSortByBottomSheetSettings<string>(listDataInBottomSheet);

        return (
            <SortByBottomSheetContext.Provider value={settings}>
                <SortByBottomSheet/>
                <WrappedComponent settings={settings}/>
            </SortByBottomSheetContext.Provider>
        )
    }
}

export default withBottomSheet;