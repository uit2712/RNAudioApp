import * as React from 'react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { IMenuSelection } from '../../interfaces';

interface ICustomMenuProps {
    triggerComponent: React.ComponentType<any>;
    headerComponent?: React.ComponentType<any>;
    listMenuSelections: IMenuSelection[];
}
function CustomMenu(props: ICustomMenuProps) {
    if (props.listMenuSelections.length === 0) {
        return null;
    }

    return (
        <Menu>
            <MenuTrigger>
                <props.triggerComponent/>
            </MenuTrigger>
            <MenuOptions>
                { props.headerComponent && <props.headerComponent/> }
                {
                    props.listMenuSelections.map((item: IMenuSelection, index: number) => (
                        <MenuOption
                            key={index}
                            text={item.text}
                            onSelect={() => item.onSelect && item.onSelect()}
                            style={{
                                paddingVertical: 10,
                            }}
                            customStyles={{
                                optionText: {
                                    fontSize: 18,
                                }
                            }}
                        />
                    ))
                }
            </MenuOptions>
        </Menu>
    )
}

export default CustomMenu;