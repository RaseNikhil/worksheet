import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal ,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorPicker } from 'react-native-color-picker';

const Sidebar = ({ onToolChange, onColorChange }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorPickerChange = (color) => {
    setSelectedColor(color);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => onToolChange('brush')}>
      <Image source={require('./icons/pencil.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('eraser')}>    
      <Image source={require('./icons/eraser.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('triangle')}>
      <Image source={require('./icons/triangle.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity> 
       <TouchableOpacity onPress={() => onToolChange('circle')}>
       <Image source={require('./icons/circle.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('rectangle')}>
      <Image source={require('./icons/rectangle.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('protractor')}>
      <Image source={require('./icons/semicircle.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('line')}>
      <Image source={require('./icons/line.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToolChange('compass')}>
      <Image source={require('./icons/compass.png')} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleColorPicker}>
        <Ionicons name="color-palette-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Color Picker Modal */}
      <Modal visible={showColorPicker} animationType="slide">
        <View style={styles.modalContainer}>
          <ColorPicker
            onColorSelected={(color) => {
              setShowColorPicker(false);
              setSelectedColor(color);
              onColorChange(color);
            }}
            style={styles.colorPicker}
            hideSliders
          />
          {/* Selected Color */}
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: selectedColor }]}
            onPress={() => {
              onColorChange(selectedColor);
              setShowColorPicker(false);
            }}
          >
            <Text style={styles.buttonText}>Selected Color</Text>
          </TouchableOpacity>
          {/* Black */}
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: '#000000' }]}
            onPress={() => {
              onColorChange('#000000');
              setShowColorPicker(false);
            }}
          >
            <Text style={styles.buttonText}>Black</Text>
          </TouchableOpacity>
          {/* White */}
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: '#FFFFFF' }]}
            onPress={() => {
              onColorChange('#FFFFFF');
              setShowColorPicker(false);
            }}
          >
            <Text style={styles.buttonText}>White</Text>
          </TouchableOpacity>
          {/* Close */}
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowColorPicker(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => {/* Handle undo logic here */}}>
      <Icon name="undo" size={24} color="black" style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Handle clear all logic here */}}>
        <Ionicons name="trash-outline" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 60,
        height: '100%',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
      },
      icon: {
        width: 24,
        height: 24,
        tintColor: 'black', // Optionally, you can set a tint color for the image
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      colorPicker: {
        width: 250,
        height: 250,
      },
      colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
      },
      closeButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
      },
});

export default Sidebar;
