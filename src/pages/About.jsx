import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { experiences, skills } from '../constants'

import "react-vertical-timeline-component/style.min.css";
import CTA from "../components/CTA.jsx";

const About = () => {
    return (
        <section className='max-container'>
            <h1 className='head-text'>
                Привет, я <span className='blue-gradient_text font-semibold drop-shadow'>
            Анастасия </span>
                👋
            </h1>

            <div className='mt-5 flex flex-col gap-3 text-slate-500'>
                <p>
                    Веб-разработчик, специализирующийся на разработке веб-приложений, веб-игр, а также я работаю с 3D-моделями и анимацией для них.
                </p>

                <div>
                    <p> Мой путь в программировании начался со школьной скамьи, когда на информатике нам рассказали про создание сайтов и 3D моделирование.
                        С тех пор я не переставала совершенствовать свое мастерство и развиваться в данной сфере, а также всерьез взялась за веб-разработку. Я начала изучать HTML, CSS и JavaScript, создавая простые проекты и постепенно усложняя задачи.
                        Со временем я освоила современные фреймворки и библиотеки, такие как React и Vue.js, что позволило мне разрабатывать интерактивные и динамичные веб-приложения. Моими основными направлениями стали фронтенд-разработка и создание пользовательских интерфейсов, где я смогла проявить свои навыки в проектировании UX/UI и реализации адаптивного дизайна.
                        С каждым новым проектом я стремлюсь внедрять лучшие практики и современные технологии, чтобы создавать удобные и высококачественные цифровые продукты.
                    </p>
                </div>
            </div>

            <div className='py-10 flex flex-col'>
                <h3 className='subhead-text'>Мои навыки</h3>

                <div className='mt-16 flex flex-wrap gap-12'>
                    {skills.map((skill) => (
                        <div className='block-container w-20 h-20' key={skill.name}>
                            <div className='btn-back rounded-xl' />
                            <div className='btn-front rounded-xl flex justify-center items-center'>
                                <img
                                    src={skill.imageUrl}
                                    alt={skill.name}
                                    className='w-1/2 h-1/2 object-contain'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='py-16'>
                <h3 className='subhead-text'>Опыт работы</h3>
                <div className='mt-5 flex flex-col gap-3 text-slate-500'>
                    <p>
                        Мой профессиональный путь в веб-разработке и программировании насыщен разнообразными проектами и достижениями.
                        За годы работы я накопила ценный опыт в создании и поддержке веб-сайтов, разработке интерактивных приложений и реализации сложных пользовательских интерфейсов.
                        Мои навыки охватывают весь спектр веб-технологий, включая фронтенд и бэкенд, что позволяет мне эффективно работать над проектами любой сложности.
                        Благодаря этому опыту, я готова решать задачи, способствующие развитию и успеху вашего бизнеса.
                    </p>
                </div>

                <div className='mt-12 flex'>
                    <VerticalTimeline>
                        {experiences.map((experience, index) => (
                            <VerticalTimelineElement
                                key={index}
                                date={experience.date}
                                iconStyle={{ background: experience.iconBg }}
                                icon={
                                    <div className='flex justify-center items-center w-full h-full'>
                                        <img
                                            src={experience.icon}
                                            alt="icon"
                                            className='w-[60%] h-[60%] object-contain'
                                        />
                                    </div>
                                }
                                contentStyle={{
                                    borderBottom: "8px",
                                    borderStyle: "solid",
                                    borderBottomColor: experience.iconBg,
                                    boxShadow: "none",
                                }}
                            >
                                <div>
                                    <h3 className='text-black text-xl font-poppins font-semibold'>
                                        {experience.title}
                                    </h3>
                                </div>

                                <ul className='my-5 list-disc ml-5 space-y-2'>
                                    {experience.points.map((point, index) => (
                                        <li
                                            key={`experience-point-${index}`}
                                            className='text-black-500/50 font-normal pl-1 text-sm'
                                        >
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>

            <hr className='border-slate-200' />

            <CTA/>


        </section>
    );
};

export default About;
