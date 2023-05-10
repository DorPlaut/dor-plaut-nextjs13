/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Center, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';

export default function FlashDrive(props) {
  const { nodes, materials } = useGLTF('/Flash drive.glb');
  //   animation

  return (
    <Center {...props}>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001_Text001_Material001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001_Text001_Material002.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001_Text001_Material004.geometry}
          material={materials['Material.004']}
        />
      </group>
    </Center>
  );
}

// useGLTF.preload('/Flash drive.glb');
