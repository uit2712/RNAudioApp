import { IUpdatingModalRef } from "@interfaces/index";

export class ModalManager {
    private _defaultAlert?: React.RefObject<IUpdatingModalRef>;
    public register(_ref: React.RefObject<IUpdatingModalRef>): void {
        this._defaultAlert = _ref;
    }
    public unregister(_ref: React.RefObject<IUpdatingModalRef>) {
        this._defaultAlert = undefined;
    }
    public getDefault() {
        return this._defaultAlert;
    }
}