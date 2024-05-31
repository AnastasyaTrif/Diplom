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
            <p>We use cookies to improve your experience. By using our site, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
            <button onClick={handleAccept} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Accept
            </button>
        </div>
    );
};

export default CookieConsent;
