import {Header} from '../components/Header'
import {Footer} from "../components/Footer";
import {Outlet} from 'react-router-dom'

const SharedLayout = () => {
    return (
        <>
            <Header/>
            <div className='min-h-screen min-w-screen bg-blue-950 containerBackground'>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default SharedLayout