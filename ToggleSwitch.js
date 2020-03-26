/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";

import PropTypes from "prop-types";

export default class ToggleSwitch extends React.Component {
  static calculateDimensions(size) {
    switch (size) {
      case "small":
        return {
          width: 40,
          padding: 10,
          circleWidth: 15,
          circleHeight: 15,
          translateX: 22
        };
      case "large":
        return {
          width: 70,
          padding: 20,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 38
        };
      default:
        return {
          width: 46,
          padding: 12,
          circleWidth: 18,
          circleHeight: 18,
          translateX: 26
        };
    }
  }

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onColor: PropTypes.string.isRequired,
    offColor: PropTypes.string.isRequired,
    size: PropTypes.string,
    labelStyle: PropTypes.object,
    onToggle: PropTypes.func,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    thumbColor: PropTypes.string
  };

  static defaultProps = {
    isOn: false,
    onColor: "#4cd137",
    offColor: "#ecf0f1",
    size: "medium",
    labelStyle: {},
    thumbOnStyle: {},
    thumbOffStyle: {},
    trackOnStyle: {},
    trackOffStyle: {},
    icon: null,
    disabled: false,
    thumbColor: '#ffffff'
  };

  offsetX = new Animated.Value(0);
  dimensions = ToggleSwitch.calculateDimensions(this.props.size);

  createToggleSwitchStyle = () => ({
    justifyContent: "center",
    width: this.dimensions.width,
    borderRadius: 20,
    padding: this.dimensions.padding,
    backgroundColor: this.props.isOn ? this.props.onColor : this.props.offColor,
    ...(this.props.isOn ? this.props.trackOnStyle : this.props.trackOffStyle)
  });

  createInsideCircleStyle = () => ({
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    position: "absolute",
    backgroundColor: this.props.thumbColor,
    transform: [{ translateX: this.offsetX }],
    width: this.dimensions.circleWidth,
    height: this.dimensions.circleHeight,
    borderRadius: this.dimensions.circleWidth / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
    ...(this.props.isOn ? this.props.thumbOnStyle : this.props.thumbOffStyle)
  });

  render() {
    const { isOn, onToggle, disabled, labelStyle, label, icon } = this.props;

    const toValue = isOn
      ? this.dimensions.width - this.dimensions.translateX
      : 0;

    Animated.timing(this.offsetX, {
      toValue,
      duration: 300
    }).start();

    return (
      <View style={styles.container}>
        {label ? (
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        ) : null}
        <TouchableOpacity
          style={this.createToggleSwitchStyle()}
          activeOpacity={0.8}
          onPress={() => (disabled ? null : onToggle(!isOn))}
        >
          <Animated.View style={this.createInsideCircleStyle()}>
            {icon}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  labelStyle: {
    marginHorizontal: 10
  }
});
