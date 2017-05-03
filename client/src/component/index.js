import React from 'react';

import SidePane from './SidePane';
import Canvas from './Canvas';

// Main wrapper
export default () => {
  return (
    <div>
      <SidePane />
      <Canvas />
    </div>
  );
}
