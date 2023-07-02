import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {StreamerProfile} from "./pages/StreamerProfile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/streamer/:id" element={<StreamerProfile/>}/>
            </Routes>
        </>
    );
}

export default App;
