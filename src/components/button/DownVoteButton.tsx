import {BiSolidDislike} from 'react-icons/bi';
import {useState} from "react";
import {VoteButtonProps} from "../../types";



export const DownVoteButton = ({handleVoteClick,id}: VoteButtonProps) => {

    const [liked, setLiked] = useState<boolean>(true)
    const [disliked, setDisliked] = useState<boolean>(true)

    const addDislike = (id: string) => {

        if (disliked === true && liked === false) {
            handleVoteClick(id, {upVotes: -1});
            setLiked(!liked);
        }
        if (disliked === true) {
            handleVoteClick(id, {downVotes: 1});
            setDisliked(false);
        }
        if (disliked === false) {
            handleVoteClick(id, {downVotes: -1});
            setDisliked(true);
        }
    };

    return (
        <div
            onClick={() => addDislike(id)}
            className={`group ${disliked ? 'bg-slate-100' : 'bg-red-500'} rounded-full p-3 hover:bg-red-500 transition-all cursor-pointer`}
        >
            <BiSolidDislike
                key={id}
                className={`${disliked ? '' : 'text-white'} group-hover:text-white text-red-500 text-3xl`}
            />
        </div>
    );
};
