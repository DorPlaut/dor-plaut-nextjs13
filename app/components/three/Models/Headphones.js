/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Center, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';

export default function Headphones(props) {
  const { nodes, materials } = useGLTF(
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/headphones/model.gltf'
  );
  return (
    <Center {...props}>
      <group dispose={null}>
        <mesh geometry={nodes.Cushion.geometry} material={materials.Cushion} />
        <mesh
          geometry={nodes.Ear_Cup.geometry}
          material={nodes.Ear_Cup.material}
        />
        <mesh
          geometry={nodes['Mid-'].geometry}
          material={materials['Black-2']}
        />
        <mesh
          geometry={nodes.Seprator001.geometry}
          material={nodes.Seprator001.material}
        />
        <mesh
          geometry={nodes.Seprator.geometry}
          material={materials.Connector}
        />
        <mesh
          geometry={nodes.Cylinder025.geometry}
          material={nodes.Cylinder025.material}
        />
        <mesh
          geometry={nodes.Cylinder025_1.geometry}
          material={materials.GlowBlue}
        />
      </group>
    </Center>
  );
}

useGLTF.preload(
  'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/headphones/model.gltf'
);
