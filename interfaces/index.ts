import React, { FunctionComponent } from 'react';

import { AudioStatusType, } from 'types/index';
import { ComponentProvider } from 'react-native';
import { SoundFileType } from 'types/songs-screen-types';
import { Source } from 'react-native-fast-image';

export interface IMenuSelection {
    text: string;
    onSelect?: () => void;
}

export interface IDrawerHomeContext {
    isShowTabBar: boolean;
    setIsShowTabBar: (isShowTabBar: boolean) => void;
    isShowMiniPlayer: boolean;
    setIsShowMiniPlayer: (isShowMiniPlayer: boolean) => void;
}

export interface ICustomMenuProps {
    triggerComponent: React.ComponentType<any>;
    headerComponent?: React.ComponentType<any>;
    listMenuSelections: IMenuSelection[];
}

export interface IRequestAudioHelper {
    listSounds: SoundFileType[];
    timeRate?: number; // seconds
    isLogStatus?: boolean;
    isAutoplayOnLoad?: boolean;
}

export interface IPlayer {
    play: () => void;
    pause: () => void;
    stop: () => void;
    next: () => void;
    previous: () => void;
    increaseTime: () => void;
    decreaseTime: () => void;
    seekToTime: (seconds: number) => void;
    setSpeed: (speed: number) => void;
    shuffle: () => void;
    loop: () => void;
    mute: () => void;
    unmute: () => void;
    setVolume: (volume: number) => void;
    playAudio: (audioIndex: number) => void;
    setListSounds: (listSounds: SoundFileType[]) => void;
    getCurrentTime: (cb?: ((seconds: number, isPlaying: boolean) => void) | undefined) => void;
    setCurrentTime: (seconds: number) => void;
    setListSoundsAndPlay: (listSounds: SoundFileType[], audioIndex: number) => void;
    status: AudioStatusType;
    duration: number; // seconds
    currentTime: number; // seconds
    isDisabledButtonPlay: boolean;
    isDisabledButtonPause: boolean;
    isDisabledButtonStop: boolean;
    isDisabledButtonNext: boolean;
    isDisabledButtonPrevious: boolean;
    timeRate: number; // seconds
    speed: number;
    isShuffle: boolean;
    errorMessage: string;
    isLoop: boolean;
    isMuted: boolean;
    volume: number; // percents from 0-100
    currentIndex: number;
    listSounds: SoundFileType[];
    currentAudioInfo: ICurrentAudioInfo;
}

export interface ICurrentAudioInfo {
    name: string;
    genre: string | undefined;
    artist: string | undefined;
    album: string | undefined;
    other: string;
    durationString: string;
    currentTimeString: string;
    duration: number;
    currentTime: number;
    cover?: string;
    originalInfo: SoundFileType;
}

export interface INavigatorScreen<ScreenParams> {
    name: keyof ScreenParams;
    component: React.ComponentType<any>;
    title: string;
    label: ({ title, color }: { title: string, color?: string }) => JSX.Element;
    icon: ({ color, size }: { color?: string, size?: number }) => JSX.Element;
    isVisible: boolean;
}

export interface IStackNavigatorScreen<ScreenParams> extends INavigatorScreen<ScreenParams> {
    getColor: (isFocused: boolean) => string;
}

export interface IDrawerNavigatorScreen<ScreenParams> extends INavigatorScreen<ScreenParams> {
    activeBackgroundColor?: string;
    activeTintColor?: string;
    inactiveBackgroundColor?: string;
    inactiveTintColor?: string;
}

export interface IBottomSheetSection {
    title: string;
    items: IBottomSheetSectionItem[];
}

export interface IBottomSheetSectionWithType<T> extends IBottomSheetSection {
    items: IBottomSheetSectionItemWithType<T>[];
    defaultSelectedType: T;
    selectedType: T;
}

export interface IBottomSheetSectionItem {
    title: string;
    icon?: React.ComponentType<any>;
    onPress?: () => void;
}

export interface IBottomSheetSectionItemWithType<T> extends IBottomSheetSectionItem {
    type: T;
}

export interface ISortByBottomSheetContext {
    isShowSortByBottomSheet: boolean;
    setIsShowSortByBottomSheet: (isVisible: boolean) => void;
    data: IBottomSheetSection[],
}

export interface ISortByBottomSheetContextWithType<T> extends ISortByBottomSheetContext {
    isShowSortByBottomSheet: boolean;
    setIsShowSortByBottomSheet: (isVisible: boolean) => void;
    setSelectedType: (sectionIndex: number, selectedItemIndex: T) => void;
    getSelectedType: (sectionIndex: number) => T;
}

export interface IListSongsDetail {
    listSongs: SoundFileType[];
    name: string;
    cover?: Source | number | string;
}

export interface IOverlayModalContext {
    isVisible: boolean;
    toggleOverlay: () => void;
}

export interface IUseListChecked<T> {
    checked: boolean[];
    onCheck: (index: number) => void;
    setListChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
    isCheckedAllFromListChecked: boolean;
    listSelectedItems: T[];
    reset: () => void;
}

export interface IShowUpdatingModal {
    title: string;
    inputLabel: string;
    onConfirm: (param: any, onFinished: () => void) => void;
    cancelLabel: string;
    confirmLabel: string;
    // input?: string;
}

export interface IUpdatingModal extends IShowUpdatingModal {
    isVisible: boolean;
    initialState?: IUpdatingModal;
}

export interface IUpdatingModalRef {
    readonly current: IUpdatingModalRef | null;
    showModal: (props: IShowUpdatingModal) => void;
    hideModal: () => void;
    isVisible: () => boolean;
}

export interface ICurrentTimeProps {
    currentTime: number;
    currentTimeString: string;
    player: IPlayer;
}

export interface ICustomModal {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    cancelLabel: string;
    confirmLabel: string;
    isVisible: boolean;
    isDisableButtonConfirm?: boolean;
}