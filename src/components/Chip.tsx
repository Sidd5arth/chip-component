import React, { useContext, useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { chipProps } from "../types";
import { wordLimiter } from "../Utils/wordLimiter";
import AppContext from "../context/app-context";
import { getRandomLightColor } from "../Utils/randomColor";
import useModifyData from "../hooks/useModifyData";
getRandomLightColor;
const Chip: React.FC<chipProps> = ({ name, picture, id }) => {
    const { dimensions } = useContext(AppContext);
    const { deleteFromChip } = useModifyData();
    const [nameString, setNameString] = useState<string>("dummy");
    const width = dimensions.width;
    const word = (name: string, number: number) => {
        return wordLimiter(name, number);
    };
    useEffect(() => {
        if (typeof name === "string" && name.length > 0) {
            setNameString(name);
        }
    }, [name]);

    return (
        <div
            className="relative flex h-full w-full justify-between align-middle p-2 rounded-full"
            style={{ backgroundColor: getRandomLightColor() }}
        >
            <div className="w-[30px] h-[30px]">
                <img src={picture} alt="Selected" className="rounded-full max-w-full" />
            </div>
            <p className={`${width < 770 ? "mr-[4vh]" : "mr-[3vh]"}`} style={{ lineHeight: "2em" }}>
                {width < 770 ? word(nameString, 5) : width > 1500 ? word(nameString, 8) : word(nameString, 6)}
            </p>
            <button
                className="absolute top-2 right-1 rounded-full bg-transparent text-gray-700 hover:text-red-600 h-[30px] w-[30px]"
                onClick={(e) => {
                    id && deleteFromChip(id);
                }}
            >
                <TiDelete size={30} />
            </button>
        </div>
    );
};

export default Chip;
