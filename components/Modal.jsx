import React from "react";
import Draggable from "react-draggable";



function Modal({ children, shown, close, draggable, transparent }) {
    const nodeRef = React.useRef(null);
    return shown ? (
        <>
            {draggable ? (
                <div
                    className='fixed top-0 left-0 right-0 bottom-0 flex overflow-hidden items-center justify-center z-[1000] '
                    onClick={close}>
                    <Draggable nodeRef={nodeRef}>
                        <div
                            ref={nodeRef}
                            className=' min-h-1/2 bg-white rounded-lg shadow-lg'
                            onClick={(e) => {
                                // do not close modal if anything inside modal content is clicked
                                e.stopPropagation();
                            }}>
                            {children}
                        </div>
                    </Draggable>
                </div>
            ) : (
                <div
                    className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2000] bg-black bg-opacity-50'
                    onClick={close}>
                    <div
                        className={
                            transparent
                                ? "bg-transparent z-50 min-h-1/2 rounded-lg"
                                : "z-50 min-h-1/2 bg-white rounded-lg shadow-lg overflow-x-hidden overflow-y-auto"
                        }
                        onClick={(e) => {
                            // do not close modal if anything inside modal content is clicked
                            e.stopPropagation();
                        }}>
                        {children}
                    </div>
                </div>
            )}
        </>
    ) : null;
}

export default Modal;
