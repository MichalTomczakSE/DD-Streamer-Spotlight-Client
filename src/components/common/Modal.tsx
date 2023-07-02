import React, { ReactNode } from "react";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        target.id === "wrapper" ? onClose() : e.stopPropagation();
    };
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id="wrapper"
            onClick={handleClose}>
            <div className="container max-w-lg flex flex-col">
                <button
                    className="text-white text-xl place-self-end"
                    onClick={() => onClose()}>
                    X
                </button>
                <div className="bg-white p-2 rounded">
                    {children}
                </div>
            </div>
        </div>
    );
};

