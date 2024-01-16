import React, { useState, useEffect, useContext } from "react";
import { Circles } from "react-loader-spinner";
import AppContext from "../context/app-context";
import { wordLimiter } from "../Utils/wordLimiter";
import useModifyData from "../hooks/useModifyData";
const Modal: React.FC = () => {
    const { dimensions, setAllFilteredData, allFilteredData, allProfilesData, open } = useContext(AppContext);
    const width = dimensions.width;
    const { deleteFromList } = useModifyData();

    const handlListClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const itemId = e.currentTarget.getAttribute("data-id");
        if (itemId) {
            deleteFromList(itemId);
        }
    };

    return (
        <>
            {open && (
                <div
                    className={`"flex justify-center align-middle absolute shadow-lg z-50 top-20 left-0 ${dimensions.width > 500 ? "w-[300%]" : "w-[110%]"} h-[380px] overflow-y-scroll overflow-x-hidden scroll-smooth bg-white border rounded-xl" `}
                >
                    {allFilteredData === undefined || allFilteredData.length === 0 ? (
                        <section className="w-full h-full flex justify-center align-middle">
                            <div className="m-auto">
                                <Circles width={30} height={30} color="#666" />
                            </div>
                        </section>
                    ) : (
                        <section className="flex w-full h-full bg-slate-50">
                            <ul className="flex flex-col w-full">
                                {allFilteredData &&
                                    allFilteredData.map((item) => (
                                        <li
                                            onClick={(e) => handlListClick(e)}
                                            className="z-100 flex justify-between bg-white border-b-2 py-3 px-6 border-gray-300 w-full h-[80px] list-none hover:bg-gray-100 cursor-pointer"
                                            key={item.id.value}
                                            data-id={item.id.value}
                                        >
                                            <div className="flex gap-4 align-middle justify-center content-center">
                                                <div className="w-[50px] h-[50px]">
                                                    <img
                                                        src={item.picture.thumbnail}
                                                        alt="Selected"
                                                        className="rounded-full max-w-full"
                                                    />
                                                </div>
                                                <p
                                                    className={`${width < 770 ? "mr-[4vh]" : "mr-[3vh]"} my-auto font-bold text-gray-500`}
                                                >
                                                    {typeof item.login.username === "string" &&
                                                        item.login.username.length > 0 &&
                                                        wordLimiter(item.login.username, 8)}
                                                </p>
                                            </div>
                                            {dimensions.width > 500 && (
                                                <p className="my-auto text-gray-400">
                                                    {typeof item.email === "string" &&
                                                        item.email.length > 0 &&
                                                        wordLimiter(item.email, 25)}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    )}
                </div>
            )}
        </>
    );
};

export default Modal;
