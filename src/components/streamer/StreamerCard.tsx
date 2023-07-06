import {platformIcon} from "../../utils/platformIcons";
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {GetStreamersData} from "../../types";
import {DownVoteButton} from "../button/DownVoteButton";
import {socket} from "../../contexts/WebSocketContext";
import UpVoteButton from "../button/UpVoteButton";
import {Loader} from "../common/Loader";


export const StreamerCard = ({id, username, platform, upVotes, downVotes}: GetStreamersData) => {
    const truncatedUsername = username.length > 25 ? `${username.slice(0, 24)}...` : username;
    const [streamerPhoto, setStreamerPhoto] = useState<Response>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getStreamerPhoto = async (id: string) => {
        try {
            const data = await fetch(`http://localhost:3000/streamers/image/${id}`)
            if (data.status === 404) {
                setIsLoading(false)
            }
            setStreamerPhoto(data)
            setIsLoading(false)
            return data
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getStreamerPhoto(id)
    }, [id])

    const handleVoteClick = async (id: string, vote: any) => {
        const req = await fetch(`http://localhost:3000/streamers/${id}/vote`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...vote})
        })
        const res = await req.json();
        const data = await res;
        socket.emit('newVote', id)
        return data;
    }

    return (
        <div key={id}
             className="bg-white mx-auto flex flex-col items-center h-96 rounded-xl hover:scale-105 transition-all w-full shadow-md">
            <Link to={`streamer/${id}`} className="w-full h-1/2">
                {isLoading &&
                    <div
                        className='bg-black backdrop-blur-sm flex h-full justify-center items-center rounded-t-xl'>
                        <Loader/>
                    </div>
                }
                {!isLoading && <img
                    src={streamerPhoto?.status === 404 ? "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png" : streamerPhoto?.url}
                    title={username}
                    alt={username}
                    className="h-full rounded-t-xl w-full object-cover bg-black"
                />}
            </Link>
            <div className="py-2 text-center w-5/6">
                <div className="flex justify-center">
                    <Link to={`streamer/${id}`} className="font-bold" title={username}>
                        <span>{truncatedUsername}</span>
                    </Link>
                    <p title={platform} className="text-2xl ml-2">
                        {platformIcon[platform]}
                    </p>
                </div>
            </div>

            <div className="flex grow w-full justify-around items-center rounded-b-xl px-12 streamerCardBackground">
                <div className="flex flex-col items-center">
                    <UpVoteButton handleVoteClick={handleVoteClick} id={id}/>
                    <p className="text-green-500 font-bold">{upVotes}</p>
                </div>
                <div className="flex flex-col items-center">
                    <DownVoteButton handleVoteClick={handleVoteClick} id={id}/>
                    <p className="text-red-500 font-bold">{downVotes}</p>
                </div>
            </div>
        </div>
    );
};
