import * as React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMenuSelection } from '../../interfaces';
import CustomMenu from './CustomMenu';

function SettingsMenu({
    title,
    listMenuSelections,
}: {
    title?: string,
    listMenuSelections: IMenuSelection[],
}) {
    return (
        <CustomMenu
            triggerComponent={() => (
                <Entypo
                    name='dots-three-vertical'
                    size={30}
                />
            )}
            listMenuSelections={listMenuSelections}
            headerComponent={() => (
                <MenuOption
                    text={title}
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

export default SettingsMenu;