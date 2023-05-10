'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import ThreeGlobe from 'three-globe';

import {
  Box,
  OrbitControls,
  KeyboardControls,
  useKeyboardControls,
} from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

extend({ ThreeGlobe });

const Globe = (props) => {
  // controls

  //

  const { rotationSpeed } = props;
  // state
  const [countries, setCountries] = useState([]);
  const [lines, setLines] = useState([]);
  const [places, setPlaecs] = useState([]);
  //   ref
  const globeRef = useRef();

  //  data
  useEffect(() => {
    fetch('/geojson/custom.geo.json')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      }).then;
    fetch('/geojson/lines.json')
      .then((res) => res.json())
      .then((data) => {
        setLines(data);
      }).then;
    fetch('/geojson/map.json')
      .then((res) => res.json())
      .then((data) => {
        setPlaecs(data.Places);
      });
  }, []);

  // runs after three.js elements are created but before render
  useLayoutEffect(() => {
    // Configure the globe
    // image
    globeRef.current.globeImageUrl('/black.jpg');
    globeRef.current
      .showGraticules(false)
      .showGlobe(true)
      .showAtmosphere(false);

    // lines
    globeRef.current
      .arcsData(lines.pulls)
      .arcColor(
        () =>
          ['#81bef3', 'white', '#d2ac57', '#0a5ca2'][
            Math.round(Math.random() * 3)
          ]
      )
      .arcAltitude(0.25)
      .arcDashGap(() => Math.random() * 10 + 1)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(700);

    // // rings
    globeRef.current.ringsData(places).ringColor(() => '#ffce5d');

    // country polygons
    if (countries.features) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.5)
        .hexPolygonColor(() => `rgba(157, 211, 255, 0.7)`)
        .hexPolygonCurvatureResolution(3)
        .hexPolygonAltitude(0.0001);
      //
    }
  }, [countries, lines, places]);

  // animations;
  // useFrame((state, delta) => {
  //   if (globeRef.current) {
  //     globeRef.current.rotation.y += -delta * rotationSpeed;
  //     globeRef.current.rotation.x += delta * 0.02;
  //   }
  // });

  // This is a ThreeGlobe object but represented in JSX.
  // Any valid properties of that class are valid props

  return <threeGlobe {...props} ref={globeRef} />;
};

export default Globe;
