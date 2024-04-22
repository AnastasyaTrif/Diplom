import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from "../components/Loader.jsx";


const Home = () => {
    return (
        <section className="w-full h-screen relative">
            <Canvas className="w-full h-screen bg-transparent"
                    camera={{near: 0.1, far: 1000}}>
                <Suspense fallback={<Loader/>}>
                    <directionaLight/>
                    <ambientLight/>
                    <pointLight/>
                    <spotLight/>
                    <hemisphereLight/>

                </Suspense>
            </Canvas>
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                HI fogithjoisioheoihj
            </div>
        </section>
    )
}
export default Home
