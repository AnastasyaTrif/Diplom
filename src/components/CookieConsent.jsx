import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Проверяем, давал ли пользователь согласие на использование файлов cookie
        const consent = Cookies.get('cookieConsent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        // Сохраняем согласие пользователя
        Cookies.set('cookieConsent', 'true', { expires: 365 });
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
            <p>Мы используем Cookie, чтобы улучшить ваш опыт. Используя наш сайт, вы соглашаетесь с <a href="/куки.pdf" target="_blank" className="underline">Политикой использования</a>.</p>
            <button onClick={handleAccept} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Принять
            </button>
        </div>
    );
};

export default CookieConsent;
