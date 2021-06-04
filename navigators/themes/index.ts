import React from 'react';

export interface ITabSoundPlayerDetailTheme {
    colors: {
        iconInactive: string,
        iconActive: string,
        text: string,
        textSecondar: string,
    }
}
export const tabSoundPlayerDetailTheme: ITabSoundPlayerDetailTheme = {
    colors: {
        iconInactive: 'white',
        iconActive: 'rgb(255, 153, 51)',
        text: 'white',
        textSecondar: 'rgb(191, 191, 191)',
    }
}
export const SoundPlayerDetailThemeContext = React.createContext<ITabSoundPlayerDetailTheme>(tabSoundPlayerDetailTheme);