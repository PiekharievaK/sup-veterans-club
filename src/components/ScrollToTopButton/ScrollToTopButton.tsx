import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './ScrollToTopButton.module.scss';

export const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    return (
        <button
            className={`${s.scrollToTopButton} ${visible ? s.visible : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
};
