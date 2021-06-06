import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';

function Loading() {
    return (
        <View style={styles.container}>
            <Button
                loading
                type='clear'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Loading;