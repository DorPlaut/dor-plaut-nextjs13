import React from 'react';
import { angleToRadians } from '@/utils/angle';
import { Sphere, SpotLight } from '@react-three/drei';
import { a } from '@react-spring/three';

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.6} color={'white'} />

      {/*  colors */}
      {/* <directionalLight
        color="#4fc7ff"
        position={[0, 0, 1]}
        intensity={1.4}
        castShadow
      />
      <directionalLight
        color="#004a8e"
        position={[0, 0, 1]}
        intensity={4}
        castShadow
      /> */}
      {/* light/shadow */}

      {/* shine */}
      <mesh
        rotation={[angleToRadians(0), angleToRadians(0), angleToRadians(0)]}
        position={[-0, 10, 1]}
      >
        {/* <Sphere /> */}
        {/* <SpotLight
          rotation={[angleToRadians(0), angleToRadians(90), angleToRadians(0)]}
          color={'red'}
          castShadow
          intensity={0.4}
        /> */}
        <pointLight
          color={[0, 4, 6]}
          castShadow
          intensity={0.6}
          distance={100}
        />
        {/* <SpotLight color={[0, 4, 6]} castShadow intensity={2} distance={15} /> */}
      </mesh>

      {/* text lights */}
      {/* <mesh
        rotation={[angleToRadians(0), angleToRadians(180), angleToRadians(0)]}
      >
        <pointLight
          color={[0, 4, 6]}
          position={[0, 0, 6]}
          castShadow
          intensity={3}
        />
      </mesh> */}
    </>
  );
};

export default Lights;
