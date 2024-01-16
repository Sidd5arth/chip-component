import { createContext } from "react";
import { AppContextType } from "../types";

const defaultContextValue: AppContextType = {
    dimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    allProfilesData: [],
    setAllProfilesData: (e) => {
        e;
    },
    allChipData: [],
    setAllChipData: (e) => {
        e;
    },
    allFilteredData: [],
    setAllFilteredData: (e) => {
        e;
    },
    open: false,
    setOpen: (e) => {
        e;
    },
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
