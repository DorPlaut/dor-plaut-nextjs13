import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Box,
  OrbitControls,
  KeyboardControls,
  useKeyboardControls,
  Sphere,
} from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import dynamic from 'next/dynamic';
const Globe = dynamic(() => import('../Globe'), { ssr: false });

const ColorBox = (props) => {
  const [, get] = useKeyboardControls();

  const boxRef = useRef();

  useFrame((state, delta) => {
    const { forward, backward, left, right, jump } = get();
    // update box position based on keyboard input
    if (forward) {
      boxRef.current.applyImpulse({ x: 0, y: 0, z: -0.5 }, true);
      boxRef.current.applyTorqueImpulse({ x: -0.5, y: 0, z: 0 }, true);
    }
    if (backward) {
      boxRef.current.applyImpulse({ x: 0, y: 0, z: 0.5 }, true);
      boxRef.current.applyTorqueImpulse({ x: 0.5, y: 0, z: 0 }, true);
    }
    if (left) {
      boxRef.current.applyImpulse({ x: -0.5, y: 0, z: 0 }, true);
      boxRef.current.applyTorqueImpulse({ x: 0, y: 0, z: 0.5 }, true);
    }
    if (right) {
      boxRef.current.applyImpulse({ x: 0.5, y: 0, z: 0 }, true);
      boxRef.current.applyTorqueImpulse({ x: 0, y: 0, z: -0.5 }, true);
    }

    if (jump) {
      boxRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
    }
  });

  return (
    <RigidBody {...props} ref={boxRef} density={5} colliders="cuboid">
      <Box
        castShadow
        args={[1, 1, 1]}

        // rotation={[0.5, 0, 0]}
      >
        <meshNormalMaterial />
      </Box>
    </RigidBody>
  );
};

export default ColorBox;
