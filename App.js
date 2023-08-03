import React, { useState } from 'react';
import { View, StyleSheet ,Text } from 'react-native';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const App = () => {
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [tool, setTool] = useState('brush');

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleStrokeWidthChange = (newWidth) => {
    setStrokeWidth(newWidth);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
  };

  return (
    <View style={styles.container}>
      <Canvas color={color} strokeWidth={strokeWidth} tool={tool} />
      <Sidebar
        onColorChange={handleColorChange}
        onStrokeWidthChange={handleStrokeWidthChange}
        onToolChange={handleToolChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
