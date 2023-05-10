import { GearsScene } from './GearsScene';
import KeyboardScene from './KeyboardScene';
import HeadphonesScene from './HeadphonesScene';
import { LeptopScene } from './LeptopScene';
import { Suspense } from 'react';
import LoadScreen from '../LoadScreen';
import FlashDriveScene from './FlashDriveScene';

const PageScene = () => {
  return (
    <div className="three-scenes">
      <KeyboardScene className={'keyboard'} />
      <GearsScene className={'gears'} />
      <FlashDriveScene className={'flashdrive'} />
      <HeadphonesScene className={'headphones'} />
      <LeptopScene className={'leptop'} />
    </div>
  );
};

export default PageScene;
