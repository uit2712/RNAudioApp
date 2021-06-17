import * as React from 'react';

import { CheckBox, ListItem } from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItemCover from '@components/shared/SoundItemCover';
import SoundItemInfo from '@components/shared/SoundItemInfo';
import { TouchableOpacity, } from 'react-native';

class SoundAdditionItem extends React.PureComponent<{
    item: SoundFileType,
    onCheck?: () => void,
    isChecked: boolean,
    isDisabled?: boolean,
}> {
    render() {
        return (
            <>
                <ListItem
                    Component={TouchableOpacity}
                    onPress={this.props.onCheck}
                    style={{
                        width: '100%',
                    }}
                    bottomDivider
                    disabled={this.props.isDisabled}
                    disabledStyle={{
                        backgroundColor: 'lightgray',
                    }}
                >
                    <SoundItemCover value={this.props.item}/>
                    <SoundItemInfo value={this.props.item} isActive={false}/>
                    <SoundAdditionItemCheckbox
                        item={this.props.item}
                        onCheck={this.props.onCheck}
                        isChecked={this.props.isChecked}
                        isDisabled={this.props.isDisabled}
                    />
                </ListItem>
            </>
        )
    }
}

class SoundAdditionItemCheckbox extends React.PureComponent<{
    item: SoundFileType,
    onCheck?: () => void,
    isChecked: boolean,
    isDisabled?: boolean,
}> {
    render() {
        return (
            <CheckBox
                center
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
                checked={this.props.isChecked}
                onPress={() => this.props.onCheck && this.props.onCheck()}
                disabled={this.props.isDisabled}
            />
        )
    }
}

export default SoundAdditionItem;