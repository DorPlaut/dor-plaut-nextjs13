'use client';

import React, { Suspense } from 'react';
import {
  Center,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls,
  useGLTF,
} from '@react-three/drei';
import { useSpring, animated, a } from '@react-spring/three';
import { angleToRadians } from '@/utils/angle';
import Guitar from './Models/Guitar';
import { Canvas } from '@react-three/fiber';
import Lights from './background/Lights';
import LoadScreen from '../LoadScreen';

export default function GuitarScene(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/les-paul/model.gltf'
  );
  //   animation
  const ref = useRef();
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
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Lights />
          <animated.mesh ref={ref} {...settings} dispose={null}>
            <PresentationControls snap={true}>
              <Guitar
                scale={8}
                rotation={[
                  angleToRadians(0),
                  angleToRadians(10),
                  angleToRadians(40),
                ]}
              />
            </PresentationControls>
            {/* <OrbitControls enableZoom={false} /> */}
          </animated.mesh>
        </Canvas>
      </Suspense>
    </div>
  );
}
