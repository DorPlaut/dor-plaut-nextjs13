'use client';

import React, { Suspense } from 'react';
import {
  Center,
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated, useScroll } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';
import Keyboard from './Models/Keyboard';
import Lights from './background/Lights';
import LoadScreen from '../LoadScreen';

export default function KeyboardScene(props) {
  // scroll position
  const { scrollYProgress } = useScroll();
  // camera positon
  const { cameraPosition } = useSpring({
    from: { cameraPosition: [0, 0, 15] },
    to: {
      cameraPosition: scrollYProgress.to((v) => {
        const position = 10 + v * 30;
        return [0, 0, position];
      }),
    },
  });

  //
  // animations
  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = () => [
    angleToRadians(randomFloat(-10, 10)),
    angleToRadians(randomFloat(-10, 10)),
    angleToRadians(randomFloat(-10, 10)),
  ];

  //
  const [settings] = useSpring(() => ({
    loop: true,
    delay: 0,
    from: {
      position: [0, 0, 0],
      rotation: [angleToRadians(0), angleToRadians(0), angleToRadians(0)],
    },
    to: [
      {
        position: [randomFloat(-1, 1), randomFloat(-1, 1), randomFloat(-1, 1)],
        rotation: randomRotation(),
      },
      {
        position: [randomFloat(-1, 1), randomFloat(-1, 1), randomFloat(-1, 1)],
        rotation: randomRotation(),
      },
      {
        position: [randomFloat(-1, 1), randomFloat(-1, 1), randomFloat(-1, 1)],
        rotation: randomRotation(),
      },
      {
        position: [randomFloat(-1, 1), randomFloat(-1, 1), randomFloat(-1, 1)],
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
                <Keyboard
                  scale={1.6}
                  rotation={[
                    angleToRadians(90),
                    angleToRadians(30),
                    angleToRadians(0),
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
