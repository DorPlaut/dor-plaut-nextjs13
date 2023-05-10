/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Center, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';

export default function Guitar(props) {
  const { nodes, materials } = useGLTF('/Guitar.gltf');

  return (
    <Center {...props}>
      <group dispose={null}>
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh.geometry}
          material={nodes.Generic_Les_Paul_Mesh.material}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_1.geometry}
          material={materials['Golden Metal']}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_2.geometry}
          material={materials['Fretboard Wood']}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_3.geometry}
          material={materials.Ivory}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_4.geometry}
          material={materials.Finish}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_5.geometry}
          material={materials['Silver Metal']}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_6.geometry}
          material={nodes.Generic_Les_Paul_Mesh_6.material}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_7.geometry}
          material={materials.Knobs}
        />
        <mesh
          geometry={nodes.Generic_Les_Paul_Mesh_8.geometry}
          material={materials['Pickup Wrap Fabric']}
        />
      </group>
    </Center>
  );
}

useGLTF.preload('/Guitar.gltf');
