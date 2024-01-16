import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./app-context";
import { AppContextProviderProps, Dimensions, Profile } from "../types";

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [highlight, setHighlight] = useState<boolean>(false);
    const [allProfilesData, setAllProfilesData] = useState<Profile[] | undefined>([]);
    const [allChipData, setAllChipData] = useState<Profile[] | undefined>([]);
    const [allFilteredData, setAllFilteredData] = useState<Profile[] | undefined>([]);
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const changeDimensionsHandler = useCallback(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", changeDimensionsHandler);
        return () => {
            window.removeEventListener("resize", changeDimensionsHandler);
        };
    }, [changeDimensionsHandler]);

    return (
        <AppContext.Provider
            value={{
                dimensions,
                allProfilesData,
                setAllProfilesData,
                allChipData,
                setAllChipData,
                allFilteredData,
                setAllFilteredData,
                open,
                setOpen,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
