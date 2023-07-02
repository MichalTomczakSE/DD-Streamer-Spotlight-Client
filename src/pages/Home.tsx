import {StreamersList} from "../components/streamer/StreamersList";

export const Home = () => {
    return (
        <div className=" max-w-7xl grid grid-cols-1
    mx-auto min-[590px]:grid-cols-2
    lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
            <StreamersList/>
        </div>
    )

}