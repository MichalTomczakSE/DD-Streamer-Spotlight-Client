import {Modal} from "./common/Modal";
import {useState} from 'react';
import {StreamerForm} from './forms/StreamerForm'
import {NavLink} from 'react-router-dom';


export const Header = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

    const hideAllModals = () => {
        setShowModal(false);
        setShowForm(false);
    }

    return (
        <div className=" bg-black">
            <nav className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto py-3 px-5">
                <p className="text-xs md:text-xl text-white font-bold p-2">STREAMERS.SPOTLIGHT</p>
                <div>
                    <input
                        type="text"
                        placeholder="Find streamer"
                        className="p-2 h-8 w-48"
                    />
                </div>
                <div
                className="text-xs lg:text-lg">
                    <NavLink
                        to="/"
                        className={({isActive}) => `${isActive ? 'border-white border-b-2' : ''} mx-4 p-2 text-white  hover:border-b-2 hover:border-white transition-all hover:tracking-wider `}
                    >
                        All streamers
                    </NavLink>

                    <button
                        type='button'

                        onClick={() => {
                            setShowModal(true);
                            setShowForm(true);
                        }}
                        className='text-white p-2 text-xs lg:text-lg'>Add streamer
                    </button>
                    <Modal isOpen={showModal} onClose={() => hideAllModals()}>
                        {showForm && <StreamerForm onRedirect={() => hideAllModals()}/>}
                    </Modal>
                </div>
            </nav>
        </div>
    )
}