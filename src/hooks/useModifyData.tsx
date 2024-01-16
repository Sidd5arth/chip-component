import { useContext } from "react";
import AppContext from "../context/app-context";

interface UseCustomHookReturnType {
    deleteFromChip: (id: string) => void;
    deleteFromList: (id: string) => void;
    deleteFromChipOnBackspace: () => void;
}

const useModifyData = (): UseCustomHookReturnType => {
    const { setAllProfilesData, setAllChipData, allFilteredData, setAllFilteredData, allProfilesData, allChipData } =
        useContext(AppContext);
    const deleteFromList = (id: string): void => {
        const deletedItem = allProfilesData && allProfilesData.find((item) => item.id.value === id);
        if (deletedItem) {
            if (Array.isArray(allChipData)) {
                setAllChipData([...allChipData, deletedItem]);
            }
        }
        const updatedAllProfilesData = allProfilesData && allProfilesData.filter((item) => item.id.value !== id);

        setAllProfilesData(updatedAllProfilesData);
        setAllFilteredData(updatedAllProfilesData);
    };

    const deleteFromChip = (id: string): void => {
        const deletedItem = allChipData && allChipData.find((item) => item.id.value === id);
        if (deletedItem) {
            if (Array.isArray(allProfilesData)) {
                setAllProfilesData([...allProfilesData, deletedItem]);
            }
            if (Array.isArray(allFilteredData)) {
                setAllFilteredData([...allFilteredData, deletedItem]);
            }
        }
        const updatedAllChipData = allChipData && allChipData.filter((item) => item.id.value !== id);
        setAllChipData(updatedAllChipData);
    };
    const deleteFromChipOnBackspace = (): void => {
        if (Array.isArray(allChipData) && allChipData.length > 0) {
            const deletedItem = allChipData[allChipData.length - 1];

            if (deletedItem) {
                setAllProfilesData((prevData) => [...(prevData || []), deletedItem]);
                setAllFilteredData((prevFilteredData) => [...(prevFilteredData || []), deletedItem]);
            }

            const updatedAllChipData = allChipData.slice(0, -1);
            setAllChipData(updatedAllChipData);
        }
    };

    return { deleteFromList, deleteFromChip, deleteFromChipOnBackspace };
};

export default useModifyData;
