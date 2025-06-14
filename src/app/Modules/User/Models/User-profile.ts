import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IUserProfile } from "../Interface/User-pofile.interface";

export class UserProfile extends ResponseMessages {
    Item: IUserProfile;

    constructor() {
        super();
        this.Item = {} as IUserProfile;
    }
}