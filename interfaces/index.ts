export interface IMenuSelection {
    text: string;
    onSelect?: () => void;
}

export interface IDrawerHomeContext {
    isShowTabBar: boolean;
    setIsShowTabBar: (isShowTabBar: boolean) => void;
}

export interface ICustomMenuProps {
    triggerComponent: React.ComponentType<any>;
    headerComponent?: React.ComponentType<any>;
    listMenuSelections: IMenuSelection[];
}