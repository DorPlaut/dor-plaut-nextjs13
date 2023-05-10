'use client';

import React, { useRef, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Html,
  KeyboardControls,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei';
import ColorBox from './ColorBox';
import ErrorText from '../ErrorText';
import Lights from './Lights';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';
// import { Physics, useBox, usePlane } from '@react-three/cannon';
import { Physics, RigidBody, Debug, CuboidCollider } from '@react-three/rapier';
import dynamic from 'next/dynamic';
import Controlls from './Controlls';
import Floor from './Floor';
import { useMobileStore } from '@/store/mobileStore';
import Guitar from '../Models/Guitar';
import Keyboard from '../Models/Keyboard';
import FlashDrive from '../Models/FlashDrive';
import { Gears } from '../Models/Gears';

const Scene = () => {
  const isMobile = useMobileStore((state) => state.isMobile);
  const [boxPosition, setBoxPosition] = useState([0, 3, 0]);
  const [isZoomd, setIsZoomd] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.1);

  function fireKey(key, isKeyDown) {
    const keyMap = {
      w: 'KeyW',
      a: 'KeyA',
      s: 'KeyS',
      d: 'KeyD',
      r: 'KeyR',
    };
    const code = keyMap[key.toLowerCase()];
    if (code) {
      const event = new KeyboardEvent(isKeyDown ? 'keydown' : 'keyup', {
        key,
        code,
        which: code.charCodeAt(0),
        keyCode: code.charCodeAt(0),
      });
      window.dispatchEvent(event);
    }
  }

  return (
    <div className="scene">
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space', 'r', 'R'] },
        ]}
      >
        <Canvas shadows>
          {/* CAMERA */}
          <mesh
            rotation={[
              angleToRadians(-90),
              angleToRadians(0),
              angleToRadians(0),
            ]}
          >
            <PerspectiveCamera
              makeDefault
              position={[0, 0, isMobile ? 40 : 20]}
            />
          </mesh>
          {/* LIGHT */}
          <Lights />
          {/* items */}
          <Physics>
            <ColorBox position={[0, 5, 7]} />
            {/* item */}
            <RigidBody
              rotation={[0, angleToRadians(0), angleToRadians(180)]}
              position={[-12, 5, -5]}
              density={0.2}
              colliders={'trimesh'}
            >
              <Gears scale={0.000005} />
            </RigidBody>
            <RigidBody
              rotation={[0, angleToRadians(-20), angleToRadians(0)]}
              position={[11, 8, -5]}
              density={0.2}
              colliders={'trimesh'}
            >
              <FlashDrive scale={1} />
            </RigidBody>

            <ErrorText position={[2, 0, 0]} />
            {/* floor */}
            <Floor />
          </Physics>
          {/* controlls */}
        </Canvas>
        <Controlls fireKey={fireKey} />
      </KeyboardControls>
    </div>
  );
};

export default Scene;
