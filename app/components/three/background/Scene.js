'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas, extend } from '@react-three/fiber';
import {
  PerspectiveCamera,
  PresentationControls,
  Environment,
  Cloud,
  Stars,
} from '@react-three/drei';
import Keyboard from '../KeyboardScene';
import Headphones from '../HeadphonesScene';
import { Gears } from '../GearsScene';
// import Guitar from '../Guitar';
// import FlashDrive from '../Models/FlashDrive';
import { Leptop } from '../LeptopScene';
import { useSpring, animated } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';
import Lights from './Lights';
// import { Physics, useBox, usePlane } from '@react-three/cannon';
import dynamic from 'next/dynamic';
import { Physics, RigidBody } from '@react-three/rapier';
const Globe = dynamic(() => import('../Globe'), { ssr: false });
// zustand state
import { useMobileStore } from '@/store/mobileStore';

const Scene = ({ title, page }) => {
  // is mobile
  const isMobile = useMobileStore((state) => state.isMobile);
  // star animation
  const [settings, api] = useSpring(() => ({
    loop: true,
    from: {
      rotation: [angleToRadians(0), angleToRadians(0), angleToRadians(0)],
    },
    to: {
      rotation: [angleToRadians(0), angleToRadians(360), angleToRadians(0)],
    },
    config: {
      duration: 90000,
    },
  }));
  return (
    <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }}>
      <mesh
        rotation={[angleToRadians(0), angleToRadians(0), angleToRadians(0)]}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, title ? (isMobile ? 20 : 10) : isMobile ? 35 : 20]}
        />
        {/* <Lights /> */}
      </mesh>

      {/* stars */}
      <animated.mesh {...settings}>
        <Stars radius={200} />
      </animated.mesh>
      {/* <Cloud
        position={[0, 0, -20]}
        opacity={0.01}
        speed={0.8} // Rotation speed
        width={50} // Width of the full cloud
        depth={1} // Z-dir depth
        segments={20} // Number of particles
        color={[2, 1, 3]}
      /> */}
      <hemisphereLight intensity={0.3} />
      <Environment preset="night" />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default Scene;
