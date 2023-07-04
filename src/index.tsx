import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {socket, WebSocketProvider} from "./contexts/WebSocketContext";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <div className='mx-auto'>
        <div className="mx-auto">
            <WebSocketProvider value={socket}>
                <QueryClientProvider client={queryClient}>
                    <React.StrictMode>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </React.StrictMode>
                </QueryClientProvider>
            </WebSocketProvider>
        </div>
    </div>
);


reportWebVitals();
