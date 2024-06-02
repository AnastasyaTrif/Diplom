import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from "../components/Loader.jsx";
import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
// import Plane from "../models/Plane.jsx";
import HomeInfo from "../components/HomeInfo.jsx";
import CookieConsent from '../components/CookieConsent.jsx';
import sakura from '../assets/sakura.mp3'
import {soundoff, soundon} from "../assets/icons/index.js";

const Home = () => {
    const audioRef= useRef(new Audio(sakura))
    audioRef.current.volume = 0.4
    audioRef.current.loop = true
    const [isPlayingMusic, setIsPlayingMusic] = useState(false)
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    useEffect(() => {
        if(isPlayingMusic) {
            audioRef.current.play()
        }
        return () => {
            audioRef.current.pause()
        }
    }, [isPlayingMusic])
    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
        if (window.innerWidth < 768) {

            // screenScale = [0.9, 0.9, 0.9]; первые, какие были
            // screenPosition = [0, -6.5, -43];
            screenScale = [0.425, 0.425, 0.425];
            screenPosition = [0, -90, -650];

        } else {
            // screenScale = [1, 1, 1];
            // screenPosition = [0, -6.5, -43.4]; // первые, какие были
            screenScale = [0.3, 0.3, 0.3];
            screenPosition = [0, -90, -650]; // положение модели на экране (сторона сдвиг, верх низ, вперед назад отдоление )
        }
        return [screenScale, screenPosition];
    };
    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {

            screenScale = [1.5, 1.5, 1.5];
            screenPosition=[0, -1.5, 0]

        } else {
            screenScale = [3, 3, 3]
            screenPosition = [0, -4, -4] // for big screen should be better
        }
        return [screenScale, screenPosition];
    };

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition] = adjustPlaneForScreenSize();
    return (
        <section className="w-full h-screen relative">
        <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            {currentStage && <HomeInfo  currentStage = {currentStage}/>}
        </div>
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
                camera={{  near: 0.1, far: 3000 }}
            >


            <Suspense fallback={<Loader />}>
                    <directionalLight position={[10, 2, 3]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 5, 10]} intensity={2} />
                    <spotLight
                        position={[0, 50, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
                    <Bird/>
                    <Sky isRotating={isRotating}/>
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        // rotation={[0.1, 4.7077, 0]}
                        rotation={[0, 20, 0]} // na 180 povernyla polojenie pomeni
                        // rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}


                    />
                    {/*<Plane*/}
                    {/*isRotating={isRotating}*/}
                    {/*scale={planeScale}*/}
                    {/*position={planePosition}*/}
                    {/*rotation={[0, 16, 0]}*/}
                    {/*setIsRotating={setIsRotating}*/}
                    {/*setCurrentStage={setCurrentStage}*/}

                    {/*/>*/}
                </Suspense>
            </Canvas>
            <div className="absolute bottom-2 left-2">
            <img
                src={!isPlayingMusic ? soundoff : soundon}
                alt='sound'
                className='w-10 h-10 cursor-pointer object-contain'
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}

                />
                </div>
            <CookieConsent />
        </section>
    );
};

export default Home;
