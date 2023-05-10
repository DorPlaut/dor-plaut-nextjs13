'use client';

import React, { Suspense } from 'react';
import {
  Center,
  PerspectiveCamera,
  PresentationControls,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated, useScroll } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';
import { Gears } from './Models/Gears';
import Lights from './background/Lights';
import LoadScreen from '../LoadScreen';

export function GearsScene(props) {
  // scroll position
  const { scrollYProgress } = useScroll();
  // camera positon
  const { cameraPosition } = useSpring({
    from: { cameraPosition: [0, 0, 15] },
    to: {
      cameraPosition: scrollYProgress.to((v) => {
        const position = 10 + v * 20;
        return [0, 0, position];
      }),
    },
  });
  // animations
  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = () => [
    angleToRadians(randomFloat(-15, 15)),
    angleToRadians(randomFloat(-15, 15)),
    angleToRadians(randomFloat(-15, 15)),
  ];

  //
  const [settings, api] = useSpring(() => ({
    loop: true,
    delay: 0,
    from: {
      position: [0, 0, 0],
      rotation: [angleToRadians(0), angleToRadians(0), angleToRadians(0)],
    },
    to: [
      {
        position: [
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
        ],
        rotation: randomRotation(),
      },
      {
        position: [
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
        ],
        rotation: randomRotation(),
      },
      {
        position: [
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
        ],
        rotation: randomRotation(),
      },
      {
        position: [
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
          randomFloat(-0.5, 0.5),
        ],
        rotation: randomRotation(),
      },
      {
        position: [0, 0, 0],
        rotation: [angleToRadians(0), angleToRadians(0), angleToRadians(0)],
      },
    ],
    config: { duration: 15000 },
  }));
  return (
    <div {...props}>
      <Suspense fallback={<LoadScreen />}>
        <Canvas>
          <animated.mesh position={cameraPosition}>
            <PerspectiveCamera makeDefault />
          </animated.mesh>
          <Lights />
          <animated.mesh {...settings} dispose={null}>
            <PresentationControls snap={true}>
              <Center position={[0, -0.5, 0]}>
                <Gears
                  scale={0.000009}
                  rotation={[
                    angleToRadians(0),
                    angleToRadians(105),
                    angleToRadians(80),
                  ]}
                />
              </Center>
            </PresentationControls>
          </animated.mesh>
        </Canvas>
      </Suspense>
    </div>
  );
}
