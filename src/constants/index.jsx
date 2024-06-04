import { modelD, reactt, game } from "../assets/images";
import {
    contact,
    css,
    git,
    github,
    html,
    javascript,
    motion,
    mui,
    mysql,
    nextjs,
    nodejs,
    react,
    redux,
    sass,
    tailwindcss,

} from "../assets/icons";

import About from "../pages/About.jsx";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },

    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },

    {
        imageUrl: mysql,
        name: "MySQL",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },

];

export const experiences = [
    {
        title: "Корпоративные сайты",
        icon: reactt,
        iconBg: "#accbe1",
        date: "Март 2022 - Настоящее время",
        points: [
            "Разработка и поддержка веб-приложений с использованием React.js и других связанных технологий.",
            "Реализация адаптивного дизайна и обеспечение совместимости с различными браузерами.",

        ],
    },
    {
        title: "Браузерные игры на React",
        icon: game,
        iconBg: "#fbc3bc",
        date: "Сетябрь 2023 - Настоящее время",
        points: [
            "Разработка и поддержка браузерных игр с использованием React.js и других связанных технологий.",
            "Создание разнообразных игровых приложений, от простых аркад до сложных стратегий, с упором на оптимизацию и производительность.",
            "Обеспечение увлекательного пользовательского опыта и интерактивности в играх.",
            "Постоянное совершенствование навыков и изучение новых технологий в области веб-разработки игр.",

        ],
    },
    {
        title: "Интерактивные 3D-модели и визуализация",
        icon: modelD,
        iconBg: "#b7e4c7",
        date: "Июнь 2023 - Настоящее время",
        points: [
            "Использование технологий, таких как Three.js и WebGL, для создания интерактивных 3D-моделей и визуализаций, которые могут быть интегрированы в веб-сайты и приложения.",
            "Работа с Motion.",
            "Глубокий уровень взаимодействия и погружения.",
        ],
    },
    ]


export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: '',
    },

];

export const projects = [
    {
        iconUrl: '',
        theme: 'btn-back-red',
        name: 'Название проекта 1',
        description: 'Описание проекта 1.',
        link: '',
    },
    {
        iconUrl: '',
        theme: 'btn-back-green',
        name: 'Название проекта 2',
        description: 'Описание проекта 2.',
        link: '',
    },



];
