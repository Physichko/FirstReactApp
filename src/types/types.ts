export type Photos = {
    small : string | null;
    large : string | null;
}

export type UserType = {
    id : number;
    name : string;
    status : string;
    photos : Photos;
    followed : boolean
}

export type FrontEndUserType = {
    id : number;
    name : string;
    status : string;
    photos : Photos;
    isFollowed : boolean
}

export type ProfileType = {
    userId : number;
    lookingForAJob : boolean;
    lookingForAJobDescription : string;
    fullName : string;
    contacts : ContactsType;
    photos : Photos;
}

export type ContactsType = {
    github : string;
    vk : string;
    facebook : string;
    instagram : string;
    twitter : string;
    website : string;
    youtube : string;
    mainLink : string;
}

