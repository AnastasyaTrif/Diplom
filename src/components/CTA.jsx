import React from 'react';
import { Link } from 'react-router-dom';
import telegramIcon from '../assets/icons/telegram.png';
export const CTA = () => {
    return (
        <section className="cta">
            <p className="cta-text">
                Хотите заказать проект? <br className="sm:block hidden" />
                Давай работать вместе!
            </p>
            <Link to="/contact" className="btn">
                Связаться
            </Link>
            <a
                href="https://t.me/Trifanyyyy"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-link"
            >
                <img src={telegramIcon} alt="Telegram" className="telegram-icon" />
            </a>
        </section>
    );
};

export default CTA;
