export interface AppContextProviderProps {
    children: React.ReactNode;
}

export interface Dimensions {
    width: number;
    height: number;
}
export interface chipProps {
    name: string | undefined;
    picture: string | undefined;
    id: string | undefined;
}
export interface Profile {
    email: string | undefined;
    login: {
        username: string | undefined;
    };
    id: {
        value: string;
    };
    picture: {
        large: string | undefined;
        medium: string | undefined;
        thumbnail: string | undefined;
    };
}

export interface AppContextType {
    dimensions: Dimensions;
    allProfilesData: Profile[] | undefined;
    setAllProfilesData: React.Dispatch<React.SetStateAction<Profile[] | undefined>>;
    allChipData: Profile[] | undefined;
    setAllChipData: React.Dispatch<React.SetStateAction<Profile[] | undefined>>;
    allFilteredData: Profile[] | undefined;
    setAllFilteredData: React.Dispatch<React.SetStateAction<Profile[] | undefined>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
