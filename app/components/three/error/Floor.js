import { angleToRadians } from '@/utils/angle';
import { RigidBody } from '@react-three/rapier';
import React from 'react';

const Floor = () => {
  return (
    <RigidBody>
      <mesh receiveShadow rotation={[angleToRadians(-90), 0, 0]}>
        <planeGeometry args={[42, 19]} />
        <meshStandardMaterial opacity={0.3} transparent={true} />
      </mesh>
      <mesh position={[0, 3, -9.5]} receiveShadow>
        <planeGeometry args={[43, 10]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
      <mesh
        position={[0, 3, 9.5]}
        receiveShadow
        rotation={[angleToRadians(-180), 0, 0]}
      >
        <planeGeometry args={[43, 10]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
      <mesh
        position={[-20, 3, 0]}
        receiveShadow
        rotation={[angleToRadians(-180), angleToRadians(90), 0]}
      >
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
      <mesh
        position={[20, 3, 0]}
        receiveShadow
        rotation={[angleToRadians(0), angleToRadians(-90), 0]}
      >
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
