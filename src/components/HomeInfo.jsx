// import React from 'react'
//
// const renderContent = {
//     1: (
//         <h1>1</h1>
//     ),
//     2: (
//         <h1>2</h1>
//     ),
//     3: (
//         <h1>3</h1>
//     ),
//     4: (
//         <h1>4</h1>
//     ),
// }
//
// const InfoBox = ({text, link, bthText}) => (
//     <div>
//
//     </div>
//
// )
//
//
// export const HomeInfo = ({currentStage}) => {
//     return renderContent[currentStage] || null
//
//
// }
// export default HomeInfo
import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
    if (currentStage === 1)
        return (
            <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
                Привет, я
                <span className='font-semibold mx-2 text-white'>Анастасия</span>
                👋
                <br />
                веб-разработчик
            </h1>
        );

    if (currentStage === 2) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Имею опыт в веб-разработке <br /> и успела наработать множество скиллов
                </p>

                <Link to='/about' className='neo-brutalism-white neo-btn'>
                    Узнать больше
                    <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                </Link>
            </div>
        );
    }

    if (currentStage === 3) {
        return (
            <div className='info-box'>
                <p className='font-medium text-center sm:text-xl'>
                    Разработала несколько очень интересных проектов. <br /> Интересно больше?
                </p>

                <Link to='/projects' className='neo-brutalism-white neo-btn'>
                    Мое портфолио
                    <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                </Link>
            </div>
        );
    }

    if (currentStage === 4) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Необходимо сделать проект или просто ищите разработчика? <br/> Я в одном клике от вас!
                </p>

                <Link to='/contact' className='neo-brutalism-white neo-btn'>
                    Свяжитесь со мной
                    <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                </Link>
            </div>
        );
    }

    return null;
};

export default HomeInfo;