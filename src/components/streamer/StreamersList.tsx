import React, {useContext, useEffect, useState} from "react";
import {WebSocketContext} from "../../contexts/WebSocketContext"
import {Platform} from "../../types";
import {StreamerCard} from "./StreamerCard";

interface Streamer {
    id: string;
    username: string;
    platform: Platform;
    upVotes: number;
    downVotes: number;
}

const getStreamersData = async () => {
    const res = await fetch('http://localhost:3000/streamers')
    const data: Streamer[] = await res.json();
    return data;
}
export const StreamersList = () => {
    const [streamers, setStreamers] = useState<Streamer[] | []>([]);
    const socket = useContext(WebSocketContext);

    useEffect(() => {

        const fetchData = async () => {
            const data = await getStreamersData();
            setStreamers(data);
        };
        fetchData();

        socket.on('connect', () => {
            console.log('Connected!');
        });

        socket.on('onVote', (data) => {
            setStreamers(prevStreamers =>
                prevStreamers.map(streamer =>
                    streamer.id === data.id ? {...streamer, upVotes: data.upVotes, downVotes: data.downVotes} : streamer
                )
            );
        })
        socket.on('addStreamer', fetchData);

        return () => {
            socket.off('connect');
            socket.off('onVote');
            socket.off('addStreamer');
        }
    }, [socket])

    if (!Array.isArray(streamers) || streamers.length === 0) {
        return (
            <div className="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Streamers data is empty. Add first streamer to spotlight!
            </div>
        )
    }

        return (
            <>
                {streamers.map((streamer) => {
                    return <StreamerCard id={streamer.id} key={streamer.id}
                                         platform={streamer.platform}
                                         upVotes={streamer.upVotes}
                                         username={streamer.username}
                                         downVotes={streamer.downVotes}/>
                })}
            </>
        )


}