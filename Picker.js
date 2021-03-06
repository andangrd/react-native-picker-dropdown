import React, { Component } from 'react'
import ReactNative, { Platform, TouchableOpacity, Text, StyleSheet, ActionSheetIOS } from 'react-native'

export default class Picker extends Component {
  constructor(props){
    super(props);

    this.handlePress = this.handlePress.bind(this)
  }
  static Item = ReactNative.Picker.Item

  handlePress() {
    const { children, onValueChange } = this.props
    const labels = children.map(child => child.props.label)
    const values = children.map(child => child.props.value)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...labels, "Cancel"],
        cancelButtonIndex: labels.length,
      },
      (index) => {
        if (index < labels.length) {
          onValueChange(values[index])
        }
      }
    )
  }

  render() {
    const { children, style } = this.props
    const labels = children.map(child => child.props.label)
    const values = children.map(child => child.props.value)
    const flatStyle = (style ? StyleSheet.flatten(style) : {})

    if (Platform.OS === 'ios') {
      const { selectedValue } = this.props
      const flatStyle = (style ? StyleSheet.flatten(style) : {})
      const textStyle = {
        fontSize: 18,
        lineHeight: (flatStyle.height ? flatStyle.height : 12),
      }
      return(
        <TouchableOpacity
          onPress={this.handlePress}
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
          }}
        >
          <Text style={[{
            flex: 1,
          }, textStyle, style]}>
            {labels[values.indexOf(selectedValue)]}
          </Text>
          <Text style={[textStyle, style, {color: '#a5a5a5'}]}>▼</Text>
        </TouchableOpacity>
      )
    } else {

      return(<ReactNative.Picker {...this.props} />)
    }
  }
}
