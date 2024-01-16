import React, { useState } from "react";
import ChipComp from "./components/ChipComp";
import Modal from "./components/Modal";
import AppContextProvider from "./context/AppContextProvider";
import ToasterProvider from "./Providers/ToasterProvider";
function App() {
    return (
        <AppContextProvider>
            <ToasterProvider />
            <div className="flex align-middle justify-center w-[80vw] px-4 mt-10 pb-4 border-b-4 border-blue-300 m-auto relative">
                <ChipComp />
            </div>
        </AppContextProvider>
    );
}

export default App;
