import {Link} from "react-router-dom";
import React from "react";

interface StreamerRedirectProps {
    id: string,
    username: string,
    parentFunction?: () => void;
}

export const StreamerRedirect = ({id, username, parentFunction}: StreamerRedirectProps) =>
    <Link to={`streamer/${id}`} className="font-bold" title={username}>
        <span className="text-lg font-bold text-green-500"><u onClick={parentFunction}>Click here</u> to see his profile!</span>
    </Link>
