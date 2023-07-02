import { BiSolidLike } from 'react-icons/bi';
import {VoteButtonProps} from "../../types";
import {useState} from "react";

const UpVoteButton = ({ id, handleVoteClick }: VoteButtonProps) => {

    const [liked, setLiked] = useState<boolean>(true)
    const [disliked, setDisliked] = useState<boolean>(true)
    const addLike = (id:string) => {

        if (liked === true && disliked === false) {
            handleVoteClick(id, { downVotes: -1 });
            setDisliked(!disliked);
        }
        if (liked === true) {
            handleVoteClick(id, { upVotes: 1 });
            setLiked(false);
        }
        if (liked === false) {
            handleVoteClick(id, { upVotes: -1 });
            setLiked(true);
        }
    };

    return (
        <div
            onClick={() => addLike(id)}
            className={`group ${liked ? 'bg-white' : 'bg-green-500'} rounded-full p-3 hover:bg-green-500 transition-all cursor-pointer`}
        >
            <BiSolidLike
                key={id}
                className={`${liked ? '' : 'text-white'} group-hover:text-white text-green-500 text-3xl`}
            />
        </div>
    );
};

export default UpVoteButton;
