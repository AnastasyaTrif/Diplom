import React from 'react'
import {Link} from "react-router-dom";
import About from "../pages/About.jsx";

export const CTA = () => {
    return (
        <section className="cta">
            <p className="cta-text">Хотите заказать проект? <br className="sm:block hidden"/>
            Давай работать вместе!</p>
            <Link to="/contact" className="btn">
                Связаться
            </Link>
        </section>
    );
};
export default CTA;