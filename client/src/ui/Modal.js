// components/Modal.js
import React from 'react';
import './modal.scss'; // Make sure to style your modal accordingly

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default Modal;
