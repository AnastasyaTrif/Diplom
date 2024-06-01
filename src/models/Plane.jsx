// import React, { useEffect, useRef } from 'react';
// import planeScene from '../assets/3d/plane.glb';
// import { useAnimations, useGLTF } from "@react-three/drei";
// import Bird from "./Bird.jsx";
//
//
// export const Plane = ({ isRotating, ...props }) => {
//
//
//     const ref = useRef();
//     const { scene, animations } = useGLTF(planeScene);
//     const { actions } = useAnimations(animations, ref);
//
//     useEffect(() => {
//         if (isRotating && actions.rotationAnimation) {
//             actions.rotationAnimation.play();
//         } else if (actions.rotationAnimation) {
//             actions.rotationAnimation.stop();
//         }
//     }, [isRotating, actions]);
//
//     return (
//         <mesh {...props} ref={ref} scale={[2, 2, 2]}>
//             <primitive object={scene} />
//         </mesh>
//     );
// };
// export default Plane;
//
//
