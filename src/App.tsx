import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {StreamerProfile} from "./pages/StreamerProfile";
import SharedLayout from "./layouts/layout";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<SharedLayout/>}>
                        <Route index path='/' element={<Home/>}/>
                        <Route path="/streamer/:id" element={<StreamerProfile/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
