import { IUpdatingModalRef } from "@interfaces/index";

class ModalManager {
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

const modalManager = new ModalManager();
export default modalManager;