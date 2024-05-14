// import {Suspense, useEffect, useRef, useState} from 'react';
// import {Canvas} from '@react-three/fiber';
// import Loader from "../components/Loader.jsx";
// import Island from "../models/Island.jsx";
// import Sky from "../models/Sky.jsx";
//
//
// const Home = () => {
//     const adjustIslandForScreenSize = () => {
//         let screenScale, screenPosition;
//         if(window.innerWidth < 768) {
//             screenScale = [0.9, 0.9, 0.9];
//             let screenPosition  = [0, -6.5, -43];
//
//         } else {
//             screenScale = [1, 1, 1];
//             screenPosition=[0,-6.5,-43.4];
//
//         }
//         return [screenScale, screenPosition];
//     };
//     const [islandScale, islandPosition] = adjustIslandForScreenSize();
//     return (
//         <section className="w-full h-screen relative">
//
//             <Canvas
//                 className='w-full h-screen bg-transparent ${
//                 isRotating ? "cursor-grabbing" : "cursor-grab"
//             }'
//                 camera={{ near: 0.1, far: 1000 }}
//                 >
//                 <Suspense fallback={<Loader/>}>
//
//                     <directionalLight position={[10,2,3]} intensity={2}/>
//                     <ambientLight intensity={0.5}/>
//                     <pointLight position={[10, 5, 10]} intensity={2} />
//                     <spotLight
//                         position={[0, 50, 10]}
//                         angle={0.15}
//                         penumbra={1}
//                         intensity={2}
//                     />
//                     <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
//                    <Sky/>
//                     <Island
//                     position = {islandPosition}
//                     scale = {islandScale}
//                     rotation = {islandRotation}/>
//
//
//                     <Sky isRotating={isRotating} />
//                     <Island
//                         isRotating={isRotating}
//                         setIsRotating={setIsRotating}
//                         setCurrentStage={setCurrentStage}
//                         position={islandPosition}
//                         rotation={[0.1, 4.7077, 0]}
//                         scale={islandScale}
//                     />
//
//                 </Suspense>
//             </Canvas>
//
//
//         </section>
//     );
// };
//
// export default Home;
//
//

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from "../components/Loader.jsx";
import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
import Plane from "../models/Plane.jsx";

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
        if (window.innerWidth < 768) {

            // screenScale = [0.9, 0.9, 0.9]; первые, какие были
            // screenPosition = [0, -6.5, -43];
            screenScale = [0.425, 0.425, 0.425];
            screenPosition = [0, -30, -250];

        } else {
            // screenScale = [1, 1, 1];
            // screenPosition = [0, -6.5, -43.4]; // первые, какие были
            screenScale = [0.425, 0.425, 0.425];
            screenPosition = [0, -30, -250];
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
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
                camera={{ near: 0.1, far: 1000 }}
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
                    <Sky />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        // rotation={[0.1, 4.7077, 0]}
                        rotation={[0, 6, 0]}
                        // rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    />
                    <Plane
                        isRotation={isRotating}
                    planeScale={planeScale}
                    planePosition={planePosition}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;
