import { IMAGE_RESOURCE_URL, LIST_IMAGE_NAMES } from '../constants';

class AvatarHelper {
    private listImageNames = LIST_IMAGE_NAMES;

    public getAvatar() {
        const list = this.listImageNames.length > 0 ? this.listImageNames : LIST_IMAGE_NAMES;
        if (list.length > 0) {
            const randomIndex = Math.floor(Math.random() * list.length);;
            const result = `${IMAGE_RESOURCE_URL}/${list[randomIndex]}`;
            this.listImageNames = list.filter((item, index) => index != randomIndex);
            return result;
        }

        return '';
    }
}

export const avatarHelper = new AvatarHelper();