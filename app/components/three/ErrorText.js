import { angleToRadians } from '@/utils/angle';
import { Box, Center, Text3D } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Letter = ({ letter, color, position }) => {
  return (
    <RigidBody position={position} density={0.2} colliders={'trimesh'}>
      <Text3D castShadow font={'/The Bold Font_Bold.json'} height={1} size={3}>
        {letter} <meshStandardMaterial color={color} />
      </Text3D>
    </RigidBody>
  );
};

const ErrorText = (props) => {
  const randomFloat = (min, max) => Math.random() * (max - min) + min;

  return (
    <>
      <group
        {...props}
        rotation={[angleToRadians(-90), angleToRadians(0), angleToRadians(0)]}
      >
        <Letter
          letter={'E'}
          color={'#ff8844'}
          position={[-9, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'R'}
          color={'#0079af'}
          position={[-6, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'R'}
          color={'#3eb489'}
          position={[-3, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'O'}
          color={'#ff1629'}
          position={[0, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'R'}
          color={'#fde600'}
          position={[3, 0, randomFloat(8, 20)]}
        />
      </group>
      <group
        position={[6, 0, 4]}
        rotation={[angleToRadians(-90), angleToRadians(0), angleToRadians(0)]}
      >
        <Letter
          letter={'4'}
          color={'#ff8844'}
          position={[-9, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'0'}
          color={'#0079af'}
          position={[-6, 0, randomFloat(8, 20)]}
        />
        <Letter
          letter={'4'}
          color={'#3eb489'}
          position={[-3, 0, randomFloat(8, 20)]}
        />
      </group>
    </>
  );
};

export default ErrorText;
