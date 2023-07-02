import {BiLogoTwitch,BiLogoTiktok} from 'react-icons/bi'
import {RiKickFill} from 'react-icons/ri'
import {AiOutlineYoutube} from 'react-icons/ai'
import { ReactNode } from 'react';


export const platformIcon:  { [key: string]: ReactNode } = {
    "Twitch": <BiLogoTwitch style={{color: '#6441a5'}}/>,
    "YouTube": <AiOutlineYoutube style={{color: '#FF0000'}}/>,
    "Kick": <RiKickFill style={{color: '#3AD305'}}/>,
    "Rumble": <RiKickFill style={{color: '#8DD447'}}/>,
    "TikTok": <BiLogoTiktok/>,
}

