import React from 'react';
import { angleToRadians } from '@/utils/angle';

const Lights = () => {
  return (
    <>
      {/*  colors */}
      <directionalLight
        color="#4fc7ff"
        position={[0, 0, 1]}
        intensity={0.6}
        castShadow
      />
      <directionalLight
        color="#004a8e"
        position={[0, 0, 1]}
        intensity={1.4}
        castShadow
      />
      {/* light/shadow */}

      {/* shine */}
      <directionalLight
        color={[0, 4, 6]}
        position={[-6, 6, -8]}
        castShadow
        intensity={2}
      />
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
