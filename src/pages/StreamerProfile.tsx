import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {OneStreamerData} from "../types";
import {platformIcon} from "../utils/platformIcons";

export const StreamerProfile = () => {
    const [streamerPhoto, setStreamerPhoto] = useState<Response>()
    const [streamer, setStreamer] = useState<OneStreamerData>()
    const {id} = useParams();

    const getStreamerPhoto = async (id: string) => {
        try {
            const data = await fetch(`http://localhost:3000/streamers/image/${id}`)
            if (data.status === 404) {
            }
            setStreamerPhoto(data)
            return data
        } catch (error) {
            console.log("User don't have photo");
        }
    }

    const getStreamerInfo = async (id: string) => {
        const res = await fetch(`http://localhost:3000/streamers/${id}`)
        const data: OneStreamerData = await res.json();
        setStreamer(data)
        return data;
    }
    useEffect(() => {
        getStreamerPhoto(id as string)
        getStreamerInfo(id as string)

    }, [id])


    if (!streamer) {
        return <span className="loader fixed top-1/2 left-1/2 transform-translate-x-1/2 -translate-y-1/2"></span>;
    }
    if (streamer) {
        const {username, platform, upVotes, downVotes, description} = streamer

        return (
            <section key={id} className="flex flex-col justify-center items-center min-w-screen min-h-screen py-2">
                <div className="flex flex-col mx-auto w-2/3 max-w-4xl bg-white shadow-md">
                    <div className="flex flex-col md:flex-row w-full">
                        <img
                            src={streamerPhoto?.status === 404 ? "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png" : streamerPhoto?.url}
                            alt={username}
                            className="w-full md:w-2/5 h-72 object-cover"
                        />
                        <div className="flex flex-col justify-center md:justify-between py-5 w-full px-5">
                            <div className="flex flex-col text-center md:text-left">
                                <h2 className='font-bold'>{username}</h2>

                                <p className='flex items-center w-full md:w-fit cursor-pointer justify-center '>{platform} <span
                                    className='ml-2 text-2xl'>{platformIcon[platform]}</span></p>
                                <p className='mt-2 font-medium'>Description:</p>

                                <p className='break-all'>{description}</p>
                            </div>
                            <div className="flex justify-around font-bold mt-10">
                                <div className="flex flex-col jusify-center items-center">
                                    <p>LIKES</p>
                                    <p className="text-green-500">{upVotes}</p>
                                </div>
                                <div className="flex flex-col jusify-center items-center">
                                    <p>DISLIKES</p>
                                    <p className="text-red-500">{downVotes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    to="/"
                    className="p-4 bg-black rounded-xl text-lg font-medium text-white mt-10 mx-auto hover:scale-105 transition-all"
                >
                    Back to all streamers
                </Link>
            </section>
        );
    } else {
        return (<div>Please wait for data...
            <Link
                to="/"
                className="p-4 bg-black rounded-xl text-lg font-medium text-white mt-10 mx-auto hover:scale-105 transition-all"
            >
                Back to all streamers
            </Link></div>)
    }
};
