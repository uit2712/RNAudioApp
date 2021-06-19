import { ModalManager } from '@helpers/modal-helper';
import React from 'react';

export function withGlobalModal(WrappedComponent: React.ComponentType<any>, modalManager: ModalManager, initialState: any) {
    return class extends React.Component<any, any> {
        readonly current: any = this;
        constructor(props: any) {
            super(props);

            this.state = {
                ...initialState,
            }
        }

        componentDidMount() {
            modalManager.register(this);
        }

        componentWillUnmount() {
            modalManager.unregister(this);
        }

        showModal(props: any) {
            this.setState({
                ...props,
                isVisible: true,
            });
        }

        hideModal() {
            this.setState({
                ...initialState,
            });
        }

        isVisible = () => this.state.isVisible;

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    initialState={initialState}
                />
            )
        }
    }
}