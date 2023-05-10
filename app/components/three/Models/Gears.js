/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Center, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';

export function Gears(props) {
  const { nodes, materials } = useGLTF('/Gears.glb');

  return (
    <Center {...props}>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['13___Default']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials['13___Default']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials['13___Default']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object001.geometry}
          material={materials['13___Default']}
        />
      </group>
    </Center>
  );
}

useGLTF.preload('/Gears.glb');
