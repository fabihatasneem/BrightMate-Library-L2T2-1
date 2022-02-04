import logo from "./logo.png";
import "./App.css";
import AddBookForm from "./components/addBookForm";
import Books from "./components/books";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TailSpin} from "react-loader-spinner";
import React, {useEffect, useState} from "react";
import {Dialog, DialogContent} from "@mui/material";
import ResponsiveAppBar from "./components/topNavBar";

import Home from "./Home";
import About from "./About";
import SearchResult from "./SearchResult";
import SingleBookDetails from "./SingleBookDetails";

import {Route, Routes} from "react-router-dom";

var showToast;
var setLoading;

var transferData
var setTransferData

function App() {
     [transferData, setTransferData] = useState(null)


    const [loading, setL] = useState(false);
    setLoading = setL;
    showToast = (message) => {
        toast.dark(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Dialog open={loading}>
                <DialogContent>
                    <TailSpin color="#00BFFF" height={100} width={100}/>
                </DialogContent>
            </Dialog>

            <div className="App">
                <ResponsiveAppBar/>

                <div className="Content">

                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/about" element={<About/>}/>
                        <Route exact path="/bookdetails" element={<SingleBookDetails/>}/>
                        <Route exact path="/searchresult" element={<SearchResult/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
export {showToast, setLoading};
export {transferData, setTransferData}