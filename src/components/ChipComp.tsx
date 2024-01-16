import React, { useState, useEffect, useContext } from "react";
import { getAllProfiles } from "../apis/getProfile";
import AppContext from "../context/app-context";
import Chip from "./Chip";
import Modal from "./Modal";
import { Profile } from "../types";
import useModifyData from "../hooks/useModifyData";
import { toast } from "react-hot-toast";

const ChipComp: React.FC = () => {
    const {
        setAllProfilesData,
        allProfilesData,
        allFilteredData,
        setAllChipData,
        setAllFilteredData,
        dimensions,
        allChipData,
        setOpen,
    } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [input, setInput] = useState<string>("");
    const [backCount, setBackCount] = useState<number>(0);
    const [highlight, setHighlight] = useState<boolean>(false);
    const { deleteFromChipOnBackspace } = useModifyData();
    const width = dimensions.width;
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const profiles = await getAllProfiles();
                setAllProfilesData(profiles);
                setAllFilteredData(profiles);
            } catch (error) {
                toast.error("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [setAllProfilesData, setAllChipData]);

    useEffect(() => {
        const debounce = (fn: () => void, delay: number) => {
            let timeoutId: NodeJS.Timeout | undefined;
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(fn, delay);
            };
        };
        const delayedHandleInputChange = debounce(() => {
            handleInputChange(debouncedSearchQuery);
        }, 300);
        delayedHandleInputChange();
        return () => {
            if (delayedHandleInputChange) {
                delayedHandleInputChange();
            }
        };
    }, [debouncedSearchQuery]);

    const handleInputChange = (query: string) => {
        const queryToLowercase = query.toLowerCase();

        if (allProfilesData) {
            const matchedArr: Profile[] = allProfilesData.filter((item: Profile) => {
                return (
                    (item.login.username && item.login.username.toLowerCase().includes(queryToLowercase)) ||
                    (item.email && item.email.toLowerCase().includes(queryToLowercase))
                );
            });
            setAllFilteredData(matchedArr);
        }
    };

    const handleInputDebouncedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            setDebouncedSearchQuery(event.target.value);
        }
        setInput(event.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && input === "") {
            setBackCount((prev) => prev + 1);
            setHighlight(true);
            if (backCount > 0) {
                deleteFromChipOnBackspace();
                setBackCount(0);
                setHighlight(false);
            }
        } else {
            setHighlight(false);
        }
    };

    return (
        <section className="flex w-full">
            <ul
                className={`grid md:grid-cols-4 lg:grid-cols-6 gap-4 w-full h-full ${
                    width < 770 && width > 540 ? "grid-cols-3" : width < 360 ? "grid-cols-1" : "grid-cols-2"
                }`}
            >
                {allChipData &&
                    allChipData.map((item, index) => (
                        <li
                            key={item.id.value}
                            className={`w-full h-full rounded-full list-none ${
                                highlight && index === allChipData.length - 1 ? "border-2 border-blue-500" : ""
                            }`}
                        >
                            <Chip name={item.login.username} picture={item.picture.thumbnail} id={item.id.value} />
                        </li>
                    ))}
                <div className="relative">
                    <Modal />
                    <input
                        onClick={() => {
                            setOpen(true);
                            setBackCount(0);
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
                        onChange={handleInputDebouncedChange}
                        value={input}
                        onBlur={() => {
                            setInput("");
                        }}
                        type="text"
                        id="inputField"
                        className={`w-full p-3 focus:outline-none bg-transparent placeholder-gray-500 ${isInputFocused ? "focused" : ""}`}
                        aria-labelledby="inputFieldLabel"
                        aria-required="true"
                        placeholder="Add new user..."
                        autoComplete="off"
                    />
                </div>
            </ul>
        </section>
    );
};

export default ChipComp;
