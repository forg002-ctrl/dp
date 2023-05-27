import React from 'react';
import classes from './Modal.module.css';

const Modal = ({children, visable, setVisable}) => {
    const rootClasses = [classes.Modal];
    if (visable) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisable(false)}>
            <div className={classes.ModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;