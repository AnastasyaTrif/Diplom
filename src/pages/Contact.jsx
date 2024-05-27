import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import useAlert from "../hooks/useAlert.jsx";

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const {alert,showAlert, hideAlert} = useAlert()
    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation("run");

        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: from.name,
                to_name: "Anastasia",
                from_email: from.email,
                to_email: 'trifakova2710@gmail.com',
                message: from.message
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setIsLoading(false);
            showAlert({ show: true, text: 'Message sent successfully!', type: 'success'})

            setTimeout(() => {
                hideAlert()
                setCurrentAnimation('idle')
                setForm({name: '', email: '', message: ''})
            }, [3000])




        }).catch((error) => {
            setIsLoading(false)
            setCurrentAnimation('idle')
            console.log(error)
            showAlert({ show: true, text: 'Я не получила ваше сообщение!', type: 'danger'})
        })
    }



    useEffect(() => {
        Object.values(actions).forEach((action) => action.stop())
        if(actions[currentAnimation]) {
            actions[currentAnimation].play()
        }
    }, [actions, currentAnimation])

    return (
        <section className='relative flex lg:flex-row flex-col max-container'>
            {alert.show && <Alert {...alert} />}

            <div className='flex-1 min-w-[50%] flex flex-col'>
                <h1 className='head-text'>Get in Touch</h1>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='w-full flex flex-col gap-7 mt-14'
                >
                    <label className='text-black-500 font-semibold'>
                        Name
                        <input
                            type='text'
                            name='name'
                            className='input'
                            placeholder='Анна'
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Email
                        <input
                            type='email'
                            name='email'
                            className='input'
                            placeholder='Anna@gmail.com'
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Your Message
                        <textarea
                            name='message'
                            rows='4'
                            className='textarea'
                            placeholder='Write your thoughts here...'
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>

                    <button
                        type='submit'
                        disabled={loading}
                        className='btn'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>
            </div>

            <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
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