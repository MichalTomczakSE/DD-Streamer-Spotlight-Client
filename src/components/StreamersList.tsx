import {useQuery} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {WebSocketContext} from "../contexts/WebSocketContext"


type Platform =
    | "Twitch"
    | "YouTube"
    | "Kick"
    | "Rumble"
    | "TikTok"

interface Streamer {
    id:string;
    username: string;
    platform: Platform;
    upVotes: number;
    downVotes: number;
}
const getStreamersData = async () => {
    const res = await fetch('http://localhost:3000/streamers')
    const data:Streamer[] = await res.json();
    return data;
}


export const StreamersList = () => {
    const [streamers, setStreamers] = useState<Streamer[] | []>([])
    const socket = useContext(WebSocketContext)

    const {isLoading, data, isError} = useQuery(
        ['streamers', streamers],
        () => getStreamersData(),
    )



    useEffect(() => {
        getStreamersData()
        socket.on('connect', () => {
            console.log('Connected!');
        })
        socket.on('onVote', (data) => {
            setStreamers(prevState => [data, ...prevState]);
        });
        return () => {
            socket.off('connect');
            socket.off('onVote');
        }
    },[socket,getStreamersData])

    if (isLoading) {
        return (
            <div>
                Loading . . .
            </div>
        )
    }

    if (!data || isError) {
        return (
            <div>Something went wrong . . .</div>
        )
    }

    return (
        <div>
            {data.map((streamer) => {
                return <li key={streamer.id}>
                    {streamer.username} {streamer.upVotes}
                </li>
            })}
        </div>
    )
}