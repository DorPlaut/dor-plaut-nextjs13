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
import Lights from './background/Lights';
import LoadScreen from '../LoadScreen';
import Headphones from './Models/Headphones';

export default function HeadphonesScene(props) {
  // scroll position
  const { scrollYProgress } = useScroll();
  // camera positon
  const { cameraRotation, cameraPosition } = useSpring({
    from: {
      cameraRotation: [0, 0, angleToRadians(180)],
      cameraPosition: [0, 0, 10],
    },
    to: {
      cameraRotation: scrollYProgress.to((v) => {
        const rotation = 180 + v * 220;
        return [0, 0, angleToRadians(rotation)];
      }),
      cameraPosition: scrollYProgress.to((v) => {
        const position = v * 3.5 - 2;
        return [-position, 0, 10];
      }),
    },
  });

  // animations
  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = () => [
    angleToRadians(randomFloat(-10, 10)),
    angleToRadians(randomFloat(-10, 10)),
    angleToRadians(randomFloat(-10, 10)),
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
  //

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
                <Headphones
                  scale={1.8}
                  rotation={[
                    angleToRadians(0),
                    angleToRadians(20),
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
