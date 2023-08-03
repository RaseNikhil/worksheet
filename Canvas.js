import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Canvas = ({ color, strokeWidth, tool }) => {
  const [paths, setPaths] = useState([]);
  const [undoPaths, setUndoPaths] = useState([]);
  const [eraseMode, setEraseMode] = useState(false);
  const [path, setPath] = useState('');

  const pan = useRef(new Animated.ValueXY()).current;

  // Recreate the panResponder whenever the tool or eraseMode changes
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (tool === 'brush' && !eraseMode) {
          setPath(`M${pan.x._value},${pan.y._value} `);
        }
      },
      onPanResponderMove: (event, gestureState) => {
        if (tool === 'brush' && !eraseMode) {
          setPath((prevPath) => prevPath + `L${pan.x._value},${pan.y._value} `);
          setPaths([...paths, path]);
        } else if (tool === 'eraser' || eraseMode) {
          setPath(`M${pan.x._value},${pan.y._value} `);
          setPaths([...paths, path]);
        }
      },
      onPanResponderRelease: () => {
        setUndoPaths([...paths]);
      },
    })
  ).current;

  // Reset the path whenever the tool or eraseMode changes
  useEffect(() => {
    if (tool === 'brush' && !eraseMode) {
      setPath(`M${pan.x._value},${pan.y._value} `);
    } else {
      setPath('');
    }
  }, [tool, eraseMode]);

  const toggleEraseMode = () => {
    setEraseMode(!eraseMode);
  };

  const handleUndo = () => {
    setPaths(undoPaths);
  };

  return (
    <View style={styles.container}>
      <Svg width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
        {paths.map((p, index) => (
          <Path key={index} d={p} stroke={color} strokeWidth={strokeWidth} fill="none" />
        ))}
      </Svg>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        {tool === 'brush' ? (
          <TouchableOpacity>
            <Image source={require('./icons/pencil.png')} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image source={require('./icons/eraser.png')} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        )}
      </Animated.View>
      <TouchableOpacity onPress={handleUndo}>
      <Icon name="undo" size={24} color="black" style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Canvas;
