import { useEffect, useRef } from "react";
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";

import { a } from "@react-spring/three";
import islandScene from '../assets/3d/island.glb';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
    const islandRef = useRef();
    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95; // скорость вращения и перемещения модели

    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        lastX.current = clientX;
    };

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);
    };

    const handlePointerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const delta = (clientX - lastX.current) / viewport.width;

            islandRef.current.rotation.y += delta * 0.01 * Math.PI;
            lastX.current = clientX;
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setIsRotating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y += 0.01 * Math.PI;
            rotationSpeed.current = 0.0125
        } else if (e.key === 'ArrowRight') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y -= 0.01 * Math.PI;
            rotationSpeed.current = -0.0125
        }
    };

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;
            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }
            islandRef.current.rotation.y += rotationSpeed.current;
        } else {
            const rotation = islandRef.current.rotation.y;
            const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
            }
        }
    });

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    return (
        <a.group ref={islandRef} {...props}>
            <group dispose={null}>
                <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <group position={[0, 0, 0]} scale={[1, 1, 1]}>
                            <mesh
                                geometry={nodes.gudang_buah023_papan_rumah_2_no_3_0.geometry}
                                material={materials.papan_rumah_2_no_3}
                            />
                        <mesh
                           
                            
                            geometry={nodes.gudang_buah023_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                        <mesh
                           
                            
                            geometry={nodes.gudang_buah023_atap_2_0.geometry}
                            material={materials.atap_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.gudang_buah023_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.gudang_buah023_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                    </group>
                    <group
                        position={[-391.825, 460.968, -85.962]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[-12.062, 64.491, 3.135]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube_papan_rumah_2_no_3_0.geometry}
                            material={materials.papan_rumah_2_no_3}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                    </group>
                    <group position={[127.43, 137.132, -494.283]} scale={[4.223, 3.701, 188.96]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube080_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube080_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube080_papan_rumah_2_no_3_0.geometry}
                            material={materials.papan_rumah_2_no_3}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube080_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                    </group>
                    <group
                        position={[-498.935, 565.487, -582.878]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube005_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube005_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[362.03, 369.563, 397.717]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube015_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube015_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[-59.866, 380.293, -497.377]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube033_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube033_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[-516.443, 380.118, -497.48]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube034_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube034_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[-113.608, 523.748, -497.89]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube041_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube041_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[137.434, 216.282, -405.478]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube042_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube042_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[-593.335, 265.456, -321.764]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube043_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube043_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[-249.314, 740.159, -154.966]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[5.644, 5.644, 11.032]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube044_lampu_0.geometry}
                            material={materials.lampu}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube044_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group
                        position={[216.759, 237.587, 112.101]}
                        rotation={[-0.783, 0, 0]}
                        scale={[4.399, 4.399, 60.608]}>
                        <mesh
                           
                            
                            geometry={nodes.Cube316_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube316_papan_rumah_2_no_3_0.geometry}
                            material={materials.papan_rumah_2_no_3}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube316_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cube316_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                    </group>
                    <group
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}>
                        <mesh
                           
                            
                            geometry={nodes.Cone006_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cone006_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cone006_pipa_0.geometry}
                            material={materials.pipa}
                        />
                    </group>
                    <group
                        position={[-302.905, 697.036, 78.167]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}>
                        <mesh
                           
                            
                            geometry={nodes.Cone011_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cone011_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.Cone011_pipa_0.geometry}
                            material={materials.pipa}
                        />
                    </group>
                    <group
                        position={[32.919, 275.15, 279.499]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[32.919, 275.15, 220.112]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum001_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum001_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[85.283, 275.15, 279.499]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum002_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum002_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[101.163, 275.15, 223.607]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum003_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum003_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group position={[66.45, 341.867, 228.22]} rotation={[-Math.PI / 2, 0, 0]} scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum004_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum004_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[193.756, 275.15, 156.126]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum005_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum005_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[36.361, 275.15, 352.862]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum006_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum006_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[80.264, 275.15, 390.606]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum007_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum007_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group position={[39.524, 661.592, 36.93]} rotation={[-Math.PI / 2, 0, 0]} scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum008_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum008_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[-17.433, 661.592, 51.37]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={33.069}>
                        <mesh
                           
                            
                            geometry={nodes.drum009_tong_0.geometry}
                            material={materials.tong}
                        />
                        <mesh
                           
                            
                            geometry={nodes.drum009_pondasi_bangunan_2_0.geometry}
                            material={materials.pondasi_bangunan_2}
                        />
                    </group>
                    <group
                        position={[-19.274, 996.125, -83.09]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas_a_0.geometry}
                            material={materials.material}
                        />
                    </group>
                    <group
                        position={[122.384, 1348.282, 1786.224]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas001_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas001_buah_0.geometry}
                            material={materials.buah}
                        />
                    </group>
                    <group
                        position={[-1216.351, 697.556, -1151.04]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas002_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas002_atap_2_0.geometry}
                            material={materials.atap_2}
                        />
                    </group>
                    <group
                        position={[1743.922, -232.766, -1216.909]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas003_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas003_a_0.geometry}
                            material={materials.material}
                        />
                    </group>
                    <group
                        position={[-1216.351, 697.556, -1151.04]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas004_Material002_0.geometry}
                            material={materials['Material.002']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas004_atap_2_0.geometry}
                            material={materials.atap_2}
                        />
                    </group>
                    <group
                        position={[1743.922, -232.766, -1216.909]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas005_Material002_0.geometry}
                            material={materials['Material.002']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas005_a_0.geometry}
                            material={materials.material}
                        />
                    </group>
                    <group
                        position={[122.384, 1348.282, 1786.224]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas006_Material002_0.geometry}
                            material={materials['Material.002']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas006_buah_0.geometry}
                            material={materials.buah}
                        />
                    </group>
                    <group
                        position={[-19.274, 996.125, -83.09]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[43.026, 43.026, 100]}>
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas007_Material002_0.geometry}
                            material={materials['Material.002']}
                        />
                        <mesh
                           
                            
                            geometry={nodes.balon_udara_panas007_a_0.geometry}
                            material={materials.material}
                        />
                    </group>
                    <group
                        position={[-284.612, 532.455, -356.593]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[-6.813, 23.278, 3.386]}>
                        <mesh
                           
                            
                            geometry={nodes.rumah_2_atap_2_0.geometry}
                            material={materials.atap_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_2_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_2_papan_rumah_2_no_3_0.geometry}
                            material={materials.papan_rumah_2_no_3}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_2_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_2_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                    </group>
                    <group
                        position={[-521.631, 276.434, -180.049]}
                        rotation={[Math.PI, 0, -Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}>
                        <mesh
                           
                            
                            geometry={nodes.rumah_3018_papan_rumah_2_no_3_0.geometry}
                            material={materials.papan_rumah_2_no_3}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_3018_atap_2_0.geometry}
                            material={materials.atap_2}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_3018_papan__rumah_2_no_1_0.geometry}
                            material={materials.papan__rumah_2_no_1}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_3018_pondasi_bangunan_0.geometry}
                            material={materials.pondasi_bangunan}
                        />
                        <mesh
                           
                            
                            geometry={nodes.rumah_3018_papan_rumah_2_no_2_0.geometry}
                            material={materials.papan_rumah_2_no_2}
                        />
                    </group>
                    <group
                        position={[128.3, 617.365, -481.422]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[23.033, 23.033, 34.251]}>
                        <mesh
                           
                            
                            geometry={nodes.buah003_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah003_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[236.457, 585.56, -29.424]}
                        rotation={[-1.925, 0, 0]}
                        scale={[18.709, 18.709, 27.821]}>
                        <mesh
                           
                            
                            geometry={nodes.buah001_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah001_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[428.477, 442.205, -138.172]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[18.457, 18.457, 27.445]}>
                        <mesh
                           
                            
                            geometry={nodes.buah002_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah002_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[438.792, 418.247, -282.334]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[23.033, 23.033, 34.251]}>
                        <mesh
                           
                            
                            geometry={nodes.buah004_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah004_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[303.391, 600.712, 128.854]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[21.061, 21.061, 31.319]}>
                        <mesh
                           
                            
                            geometry={nodes.buah005_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah005_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[-748.681, 348.127, 0.184]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[12.825, 12.825, 19.071]}>
                        <mesh
                           
                            
                            geometry={nodes.buah006_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah006_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[-700.909, 342.946, -95.081]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[23.033, 23.033, 34.251]}>
                        <mesh
                           
                            
                            geometry={nodes.buah007_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah007_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[-740.833, 342.946, 138.171]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[23.033, 23.033, 34.251]}>
                        <mesh
                           
                            
                            geometry={nodes.buah008_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah008_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <group
                        position={[-675.329, 346.314, 231.215]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[23.033, 23.033, 34.251]}>
                        <mesh
                           
                            
                            geometry={nodes.buah009_buah_0.geometry}
                            material={materials.buah}
                        />
                        <mesh
                           
                            
                            geometry={nodes.buah009_batang_pohon_0.geometry}
                            material={materials.batang_pohon}
                        />
                    </group>
                    <mesh
                       
                        
                        geometry={nodes.pulau_pulau_0.geometry}
                        material={materials.pulau}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={308.062}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 264.351, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2004_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 264.351, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2047_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 264.351, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2048_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 264.351, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2049_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 264.351, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2050_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2051_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2052_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2053_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2054_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2055_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2056_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2057_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2058_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2059_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2060_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2061_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2062_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2063_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2064_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2065_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2066_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-24.113, 266.694, -574.669]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube266_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3002_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3003_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3004_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3005_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3006_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3007_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3008_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3009_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3010_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3011_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3012_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3013_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3014_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3015_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3016_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3017_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3018_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3019_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3020_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3021_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3022_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3023_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3024_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3025_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3026_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3027_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3028_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3029_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3030_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3031_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3032_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3033_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3034_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3035_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3036_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3037_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3038_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3039_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3040_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3041_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3042_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3043_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3044_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3045_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3046_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3047_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3049_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3050_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3051_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3052_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3053_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3054_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-436.88, 439.351, -601.169]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 29.905, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3055_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_3056_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-466.184, 438.424, -51.041]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube047_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube050_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube051_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube060_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube061_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube062_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube063_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube064_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube065_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube066_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube067_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube068_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube069_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube070_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube071_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube072_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube073_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube074_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube075_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube076_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube077_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube078_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube079_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube081_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube082_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube083_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube084_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube085_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube086_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube087_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube088_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube089_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube090_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube091_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube092_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube093_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube094_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube095_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube096_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube097_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube098_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube099_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube100_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube101_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube102_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube103_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube104_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube105_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube106_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube107_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube108_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube109_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube110_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube111_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube112_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube113_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube114_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube115_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube116_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube117_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube118_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube119_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube120_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube121_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube122_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube123_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube124_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube125_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube126_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube127_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube128_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube129_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube130_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube131_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube132_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube133_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube134_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube135_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube136_atap_2_0.geometry}
                        material={materials.atap_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube137_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube138_atap_2_0.geometry}
                        material={materials.atap_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube139_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube140_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube141_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube146_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube147_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube148_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube149_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube150_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube151_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube152_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube153_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube154_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube155_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube156_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube157_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube158_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube159_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube160_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube161_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube162_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube163_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube164_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube165_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube166_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube167_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube168_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube199_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube200_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube201_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube232_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube233_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube234_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube235_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube236_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube237_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube238_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube239_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube240_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube272_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube273_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube274_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube275_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube276_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube277_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube278_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube279_pondasi_bangunan_2_0.geometry}
                        material={materials.pondasi_bangunan_2}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube309_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube310_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube311_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube312_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube313_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube314_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube315_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-4.161, 461.962, -303.875]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={[-17.301, 42.751, 5.785]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube004_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-523.15, 175.264, -39.086]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2005_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-424.827, 183.016, -396.208]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2006_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-449.244, 180.465, -385.17]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2007_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-493.762, 181.228, -378.395]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2008_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-473.38, 180.465, -402.924]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2009_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-575.616, 180.318, -261.651]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2010_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-551.281, 180.255, -272.024]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2011_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-503.371, 181.016, -272.024]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2012_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-527.297, 180.255, -258.384]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2013_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-514.366, 180.871, -389.656]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2014_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-563.253, 180.079, -388.918]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2015_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-538.919, 180.016, -399.291]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2016_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-623.438, 181.016, -272.024]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2017_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-647.364, 180.255, -258.384]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2018_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-599.809, 180.318, -261.651]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2019_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-652.04, 180.079, -388.918]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2020_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-634.674, 180.016, -400.099]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2021_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-588.672, 180.777, -399.291]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2022_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-612.598, 180.016, -385.65]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2023_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-454.731, 180.318, -261.651]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2024_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-478.925, 180.318, -261.651]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2025_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-449.244, 180.465, -95.945]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2026_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-493.762, 181.228, -89.17]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2027_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-473.38, 180.465, -113.699]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2028_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-514.366, 180.871, -100.431]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2029_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-563.253, 180.079, -99.693]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2030_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-538.919, 180.016, -110.066]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2031_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-652.04, 180.079, -99.693]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2032_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-634.674, 180.016, -110.874]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2033_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-588.672, 180.777, -110.066]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2034_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-612.598, 180.016, -96.425]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2035_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-575.616, 180.318, 27.531]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2036_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-551.281, 180.255, 17.158]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2037_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-503.371, 181.016, 17.158]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2038_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-527.297, 180.255, 30.798]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2039_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-623.438, 181.016, 17.158]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2040_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-647.364, 180.255, 30.798]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2041_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-599.809, 180.318, 27.531]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2042_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-454.731, 180.318, 27.531]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2043_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-478.925, 180.318, 27.531]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2001_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-471.773, 264.484, -448.255]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2002_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-471.325, 263.693, -424.386]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2003_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-481.921, 263.629, -471.904]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2044_papan_rumah_2_no_3_0.geometry}
                        material={materials.papan_rumah_2_no_3}
                        position={[-482.506, 263.629, -352.965]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2045_papan_rumah_2_no_2_0.geometry}
                        material={materials.papan_rumah_2_no_2}
                        position={[-481.698, 264.39, -399.868]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai_2046_papan__rumah_2_no_1_0.geometry}
                        material={materials.papan__rumah_2_no_1}
                        position={[-468.057, 263.629, -375.041]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai001_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-59.838, 394.721, -494.46]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai002_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-516.415, 394.546, -494.563]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai003_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-113.58, 538.176, -494.973]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai004_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[134.516, 230.709, -405.45]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai005_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-590.417, 279.884, -321.792]}
                        rotation={[Math.PI / 2, -0.017, -Math.PI / 2]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.lantai006_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-252.232, 754.586, -154.938]}
                        rotation={[Math.PI / 2, 0, 1.571]}
                        scale={[-6.813, 23.278, 3.386]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone_atap_2_0.geometry}
                        material={materials.atap_2}
                        position={[-302.905, 697.036, 78.167]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube019_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-242.425, 575.735, 159.109]}
                        rotation={[-Math.PI / 2, 0, 0.737]}
                        scale={[6.015, 6.015, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube020_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-380.368, 570.709, 146.839]}
                        rotation={[-Math.PI / 2, 0, 0.824]}
                        scale={[6.015, 6.015, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube021_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-379.495, 566.99, 8.833]}
                        rotation={[-Math.PI / 2, 0, 0.915]}
                        scale={[6.015, 6.015, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube022_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-243.671, 582.492, -6.513]}
                        rotation={[-Math.PI / 2, 0, 1.015]}
                        scale={[6.015, 6.015, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube023_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-311.383, 435.432, 163.378]}
                        rotation={[0, 1.481, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube024_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-390.068, 420.669, 86.318]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube025_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-317.485, 587.16, 163.378]}
                        rotation={[0, 1.481, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube026_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-390.068, 600.078, 86.318]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube027_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-228.521, 601.099, 86.318]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube028_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-303.711, 584.918, -10.145]}
                        rotation={[0, -1.495, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube035_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-112.332, 511.969, 266.968]}
                        rotation={[0, 1.481, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube036_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-184.915, 524.887, 189.908]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube037_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-23.368, 525.909, 189.908]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube038_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-98.559, 509.728, 93.445]}
                        rotation={[0, -1.495, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone004_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube029_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-229.596, 420.669, 86.318]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube030_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-303.711, 432.72, -10.145]}
                        rotation={[0, -1.495, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube031_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-112.332, 348.203, 266.968]}
                        rotation={[0, 1.481, -Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube032_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-184.915, 361.121, 189.908]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cube039_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-23.368, 362.143, 189.908]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[6.015, 6.015, 34.084]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone007_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone008_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone009_pondasi_bangunan_0.geometry}
                        material={materials.pondasi_bangunan}
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone010_atap_2_0.geometry}
                        material={materials.atap_2}
                        position={[-97.769, 697.036, 182.421]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Plane001_batang_pohon_0.geometry}
                        material={materials.batang_pohon}
                        position={[119.717, 387.151, -316.034]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4126_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4127_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4128_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4129_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4130_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4131_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4132_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4133_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4134_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4135_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4136_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4137_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4138_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4139_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4140_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4141_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4142_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4143_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4144_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4145_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4146_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4147_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4148_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4149_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[127.587, 706.725, -470.936]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4150_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4151_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4152_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4153_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4154_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4155_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[182.612, 635.023, -549.065]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4156_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4157_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4158_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4159_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[87.845, 635.023, -554.187]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4160_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4161_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4162_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4163_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4164_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4165_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4166_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4167_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[48.818, 754.39, -377.217]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4168_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4169_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4170_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4171_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4172_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4173_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[128.189, 736.76, -281.783]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4174_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4175_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4176_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4177_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[226.409, 821.28, -415.728]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4178_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4179_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4180_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4181_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[168.619, 821.28, -375.712]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4182_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4183_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4184_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4185_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[224.993, 821.28, -362.83]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Plane_batang_pohon_0.geometry}
                        material={materials.batang_pohon}
                        position={[197.559, 333.077, -148.586]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4001_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[391.805, 479.434, -236.823]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4002_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4003_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4004_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4005_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4006_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[391.805, 479.434, -236.823]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4007_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4008_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4009_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4010_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4011_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4012_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4013_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4014_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4015_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4016_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4017_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4018_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[-1.595, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4019_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[3.142, 1.547, -1.571]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4020_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[-1.692, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4021_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[Math.PI, 1.449, -1.571]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4022_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[Math.PI, -0.121, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4023_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[-Math.PI / 2, -0.121, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4024_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[0, -1.449, 1.571]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4025_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[424.425, 456.635, -136.561]}
                        rotation={[-1.449, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4026_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4027_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[368.629, 500.309, -122.472]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4028_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4029_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4030_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4031_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4032_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4033_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[438.487, 433.806, -281.496]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4034_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[391.805, 479.434, -236.823]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4035_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[391.805, 479.434, -236.823]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4036_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4037_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4038_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4039_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4040_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4041_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[319.318, 488.515, -295.983]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4042_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4043_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4044_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4045_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4046_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4047_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[284.135, 712.623, -195.402]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4048_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4049_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4050_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4051_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4052_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4053_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.516, 722.875, -131.199]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4054_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4055_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4056_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4057_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4058_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4059_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[300.975, 653.661, -37.344]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4060_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4061_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4062_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4063_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[188.356, 667.877, -17.853]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4064_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[237.697, 606.64, -34.053]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4065_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[237.697, 606.64, -34.053]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Plane004_batang_pohon_0.geometry}
                        material={materials.batang_pohon}
                        position={[83.032, 357.532, 98.802]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4066_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4067_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4068_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4069_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4070_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4071_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4072_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4073_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4074_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4075_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4076_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4077_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4078_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4079_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4080_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4081_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4082_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4083_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4084_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4085_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4086_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4087_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4088_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4089_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4090_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4091_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4092_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4093_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4094_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4095_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4096_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4097_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4098_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4099_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4100_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4101_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4102_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4103_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4104_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4105_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4106_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4107_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4108_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4109_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[338.141, 713.859, 202.919]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4110_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4111_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4112_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4113_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4114_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4115_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4116_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4117_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[371.659, 699.839, 57.627]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4118_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4119_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4120_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4121_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4122_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4123_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4124_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4125_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4278_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4279_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4280_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4281_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4282_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4283_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4284_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[133.458, 716.579, 292.434]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4285_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4286_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4287_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[Math.PI, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4288_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4289_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4290_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[135.708, 627.115, 250.339]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4299_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[0, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4300_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[236.844, 792.823, 312.374]}
                        rotation={[-Math.PI, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4301_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[0, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4302_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 833.115, 21.019]}
                        rotation={[-Math.PI, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4303_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[Math.PI, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4304_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[72.137, 825.943, 288.811]}
                        rotation={[0, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4305_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4306_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-Math.PI, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4309_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[-0.248, 1.232, -0.577]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4310_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.845, 860.752, 191.768]}
                        rotation={[2.289, 0.283, -2.951]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4311_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[-Math.PI / 2, 0, 0.997]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4312_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[0, -0.573, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4313_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[0, 0.997, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4314_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[-Math.PI / 2, 0, 2.568]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4315_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[-Math.PI, -0.997, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4316_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[Math.PI / 2, 0, -2.568]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4317_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[Math.PI, 0.471, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4318_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[134.986, 765.878, 128.914]}
                        rotation={[Math.PI / 2, 0, -1.1]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[-220.23, 174.825, 214.918]}
                        rotation={[-1.288, 0, -Math.PI]}
                        scale={58.159}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere001_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[195.731, 264.097, 66.709]}
                        rotation={[-1.004, 0, -Math.PI]}
                        scale={25.038}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere006_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[-196.144, -143.37, -539.599]}
                        rotation={[-0.847, -0.634, 0.923]}
                        scale={119.484}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere005_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[141.133, 421.326, -262.666]}
                        rotation={[-Math.PI / 2, 0, 1.604]}
                        scale={39.52}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere002_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[205.848, 275.846, -258.55]}
                        rotation={[-1.536, -0.808, 1.62]}
                        scale={29.278}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere003_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[176.685, 399.685, -207.806]}
                        rotation={[2.937, -0.298, -1.578]}
                        scale={28.857}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere004_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[181.595, 402.528, -82.001]}
                        rotation={[-1.601, -0.224, -1.49]}
                        scale={16.514}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere007_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[-286.515, 191.284, 145.646]}
                        rotation={[-1.288, 0, -Math.PI]}
                        scale={36.952}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere008_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[272.73, -238.181, -82.001]}
                        rotation={[-1.607, 0.635, -1.462]}
                        scale={29.48}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere009_Material007_0.geometry}
                        material={materials['Material.007']}
                        position={[216.359, 276.936, 2.432]}
                        rotation={[-1.506, 0.153, -1.975]}
                        scale={31.958}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[147.293, 354.014, 112.86]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1001_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[147.293, 354.014, 112.86]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1002_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[147.293, 361.048, 64.064]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1003_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[147.293, 361.048, 64.064]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1004_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[82.233, 354.014, 132.283]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1005_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[82.233, 354.014, 132.283]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1006_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[213.884, 243.206, -94.315]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1007_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[213.884, 243.477, -94.315]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1008_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[160.64, 362.646, 17.26]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1009_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[160.64, 362.646, 17.26]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1010_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-111.684, 186.827, 264.737]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1011_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-111.684, 186.827, 264.737]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1012_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-66.578, 182.676, 277.493]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1013_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-66.578, 182.676, 277.493]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1014_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-352.044, 181.705, 198.553]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1015_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-352.044, 181.705, 198.553]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1016_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-453.481, 206.123, 7.46]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1017_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-453.481, 206.123, 7.46]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1018_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-402.056, 185.115, 168.899]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1019_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-402.056, 185.115, 168.899]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1020_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-425.111, 181.432, 92.918]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1021_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-425.111, 181.432, 92.918]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1022_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[204.177, 256.477, -211.556]}
                        rotation={[Math.PI / 2, 1.122, -Math.PI / 2]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1023_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[204.177, 256.477, -211.556]}
                        rotation={[-3.134, 0.004, -2.628]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1032_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[162.123, 265.623, -321.235]}
                        rotation={[-0.352, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1033_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[162.123, 265.878, -321.329]}
                        rotation={[2.79, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1034_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[190.955, 265.615, -299.215]}
                        rotation={[-0.017, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1035_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[190.955, 265.887, -299.22]}
                        rotation={[3.125, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1024_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[181.754, 356.292, -22.838]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1025_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[181.754, 356.292, -22.838]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1026_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[170.06, 357.7, 51.416]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1027_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[170.06, 357.7, 51.416]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1028_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[162.853, 379.596, -30.398]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1029_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[162.853, 379.596, -30.398]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1030_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[199.777, 249.878, -169.205]}
                        rotation={[Math.PI / 2, 1.252, -Math.PI / 2]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1031_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[199.777, 249.878, -169.205]}
                        rotation={[-3.134, 0.003, -2.757]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1036_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[195.025, 233.635, -314.058]}
                        rotation={[-0.017, Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1037_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[195.025, 233.907, -314.062]}
                        rotation={[3.125, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1038_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-148.62, 193.151, 233.476]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1039_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-148.62, 193.151, 233.476]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1040_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-165.495, 168.195, 275.036]}
                        rotation={[Math.PI, 0.813, -Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1041_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-165.495, 168.195, 275.036]}
                        rotation={[Math.PI, -0.757, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1042_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-370.502, 184.826, 180.058]}
                        rotation={[0, 0.059, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1043_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-370.502, 184.826, 180.058]}
                        rotation={[Math.PI, 1.512, -Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1044_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-337.336, 170.209, 216.65]}
                        rotation={[0, 0.059, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1045_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-337.336, 170.209, 216.65]}
                        rotation={[Math.PI, 1.512, -Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1046_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-439.964, 179.181, 29.775]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1047_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-439.964, 179.181, 29.775]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1048_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-478.99, 176.662, 3.011]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1049_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[-478.99, 176.662, 3.011]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1050_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[206.816, 242.722, -129.03]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[20.124, 58.544, 58.544]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1051_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[206.816, 242.881, -129.03]}
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={[20.124, 58.544, 58.544]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1052_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[223.241, 241.154, -59.398]}
                        rotation={[0, 1.168, 0]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.rumput1053_rumput1_0.geometry}
                        material={materials.rumput1}
                        position={[223.241, 241.426, -59.398]}
                        rotation={[Math.PI, 0.402, -Math.PI]}
                        scale={[34.373, 100, 100]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus003_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-288.133, 464.199, 77.867]}
                        rotation={[Math.PI, 0, 0]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus001_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-97.754, 462.471, 166.194]}
                        rotation={[Math.PI, -Math.PI / 2, 0]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone002_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-406.755, 378.827, -267.937]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus004_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-392.071, 378.845, -343.577]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus002_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-59.927, 58.19, -608.153]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone001_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-60.315, 207.389, -530.356]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus005_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-547.915, 113.398, -139.039]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Torus006_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-384.029, 378.845, -171.937]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={212.139}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Cone003_pipa_0.geometry}
                        material={materials.pipa}
                        position={[-60.315, -5.658, -588.888]}
                        scale={[116.886, 116.886, 58.4]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4186_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Plane002_batang_pohon_0.geometry}
                        material={materials.batang_pohon}
                        position={[-572.102, 435.728, 83.63]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4187_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4188_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4189_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4190_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4191_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4192_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4193_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4194_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4195_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[0, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4196_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4197_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4198_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4199_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4200_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4201_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4202_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4203_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4204_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4205_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4206_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4207_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[-Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4208_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4209_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4210_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4211_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4212_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4213_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-636.365, 619.003, 22.909]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4214_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4215_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4216_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4217_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4218_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4219_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4220_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4221_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4222_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4223_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4224_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4225_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4226_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4227_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4228_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4229_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-487.531, 698.166, 14.84]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4230_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4231_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4232_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4233_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4234_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4235_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-417.536, 320.966, 261.093]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4236_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4237_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4238_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4239_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4240_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4241_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-518.771, 307.558, 241.279]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4242_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4243_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4244_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4245_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4246_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4247_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-674.706, 360.437, 231.571]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4248_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4249_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4250_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4251_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4252_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4253_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-741.614, 358.435, 138.302]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4254_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4255_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4256_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4257_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4258_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4259_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-751.08, 358.435, 0.784]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4260_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4261_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4262_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4263_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4264_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4265_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-700.112, 358.435, -94.928]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4266_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4267_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4268_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4269_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4270_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4271_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-649.208, 417.805, -13.335]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4272_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4273_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4274_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4275_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4276_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4277_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-628.08, 417.805, 107.874]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4291_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-467.556, 369.079, 190.158]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4292_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-467.556, 369.079, 190.158]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4293_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[-Math.PI / 2, -0.028, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4294_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[0, -0.028, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4295_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4296_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4297_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4298_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-548.155, 623.574, 31.579]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4307_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4308_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-449.424, 644.28, 184.125]}
                        rotation={[-Math.PI, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4319_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4320_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[-Math.PI / 2, 0, Math.PI]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4321_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4322_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4323_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4324_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4325_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[Math.PI / 2, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.daun_4326_daun_4_0.geometry}
                        material={materials.daun_4}
                        position={[-434.34, 554.465, 50.073]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                        scale={100}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere010__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1359.056, -172.456, -737.434]}
                        rotation={[-Math.PI / 2, 0, 0.829]}
                        scale={192.908}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere011__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1508.32, -39.939, -597.539]}
                        rotation={[-Math.PI / 2, 0, 0.829]}
                        scale={132.862}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere012__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1330.697, 41.719, -767.927]}
                        rotation={[-Math.PI / 2, 0, 0.829]}
                        scale={153.727}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere013__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1531.198, -172.456, -866.923]}
                        rotation={[-Math.PI / 2, 0, 0.829]}
                        scale={129.396}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere014__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1196.299, -188.575, -896.22]}
                        rotation={[-Math.PI / 2, 0, 0.829]}
                        scale={136.527}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere015__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[405.268, -408.687, 364.656]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-231.942, 231.942, 231.942]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere016__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[380.238, -365.115, 54.603]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={177.103}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere017__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[363.629, -150.269, 436.146]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-165.656, 165.656, 165.656]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere018__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[465.23, -360.566, 640.339]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-165.656, 165.656, 165.656]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere019__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[129.758, -414.129, 374.558]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-197.988, 197.988, 197.988]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere020__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[631.863, -431.275, 353.547]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-204.857, 204.857, 204.857]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere021__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[331.421, -240.128, -553.562]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-165.656, 165.656, 165.656]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere022__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[403.711, -250.549, -318.16]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-111.271, 111.271, 111.271]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere023__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[468.669, -102.587, -440.779]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-111.271, 111.271, 111.271]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere024__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[370.862, -251.574, -721.442]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[-111.271, 111.271, 111.271]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere025__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-579.183, -282.841, 166.814]}
                        rotation={[Math.PI / 2, 0, 0.572]}
                        scale={[-165.656, 165.656, 165.656]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere026__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-398.672, -272.904, 271.561]}
                        rotation={[Math.PI / 2, 0, 0.572]}
                        scale={[-114.403, 114.403, 114.403]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere027__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-607.33, -103.296, 161.968]}
                        rotation={[Math.PI / 2, 0, 0.572]}
                        scale={[-114.403, 114.403, 114.403]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere028__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-887.887, 143.954, 1090.081]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-205.519, 205.519, 205.519]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere029__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-595.841, 131.026, 1000.396]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-138.046, 138.046, 138.046]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere030__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-747.966, 314.593, 919.807]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-138.046, 138.046, 138.046]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere031__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-1096.166, 129.753, 1041.149]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-138.046, 138.046, 138.046]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere032__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-902.735, 290.025, 1324.468]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-138.046, 138.046, 138.046]}
                    />
                    <mesh
                       
                        
                        geometry={nodes.Icosphere033__0.geometry}
                        material={materials['Icosphere.010__0']}
                        position={[-821.666, 436.485, 1369.323]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        scale={[-72.572, 72.572, 72.572]}
                    />
                </group>
            </group>
        </group>
            </a.group>
    )
}


    export default Island;