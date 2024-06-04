import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import useAlert from "../hooks/useAlert.jsx";
import Alert from "../components/Alert.jsx";
import Loader from "../components/Loader.jsx";
import { Fox } from "../models/Fox.jsx";

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });
    const [loading, setLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const { alert, showAlert, hideAlert } = useAlert();
    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setCurrentAnimation("hit");

        if (!form.consent) {
            showAlert({ show: true, text: "Вы должны согласиться на обработку данных.", type: "danger" });
            setLoading(false);
            return;
        }

        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Anastasia",
                from_email: form.email,
                to_email: 'trifakova2710@gmail.com',
                message: form.message,
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setLoading(false);
            showAlert({ show: true, text: "Спасибо за ваше сообщение 😃", type: "success" });

            setTimeout(() => {
                hideAlert(false);
                setCurrentAnimation("idle");
                setForm({ name: "", email: "", message: "", consent: false });
            }, 3000);

        }, (error) => {
            setLoading(false);
            console.error(error);
            showAlert({ show: true, text: "Я не получила ваше сообщение!", type: "danger" });
            setCurrentAnimation("idle");
        });
    };

    return (
        <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
            {alert.show && <Alert {...alert} />}

            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Напишите мне</h1>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
                    <label className="text-black-500 font-semibold">
                        Имя
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="Анна"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="Anna@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Ваше сообщение
                        <textarea
                            name="message"
                            rows="4"
                            className="textarea"
                            placeholder="Напишите сюда свое сообщение..."
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        <input
                            type="checkbox"
                            name="consent"
                            required
                            checked={form.consent}
                            onChange={handleChange}
                        />
                        Я согласен(а) на обработку моих персональных данных в соответствии с <a href="/Политика_конфиденциальности.pdf" target="_blank" style={{ color: "blue" }}>политикой конфиденциальности</a>.
                    </label>


                    <button
                        type="submit"
                        disabled={loading}
                        className="btn"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {loading ? "Отправка..." : "Отправить"}
                    </button>
                </form>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <directionalLight position={[0, 0, 1]} intensity={2.5} />
                    <ambientLight intensity={1} />
                    <pointLight position={[5, 10, 0]} intensity={2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />

                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.629, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Contact;
