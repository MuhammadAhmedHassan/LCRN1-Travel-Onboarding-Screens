import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {COLORS, FONTS, images, SIZES} from '../../const';

const {onboarding1, onboarding2, onboarding3} = images;

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding3,
  },
];

const OnBoarding = () => {
  const [completed, setCompleted] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.ceil(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => {
      scrollX.removeListener();
    };
  }, []);

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height > 700 ? '20%' : '16%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.padding / 2,
            marginBottom: SIZES.padding * 2,
            height: SIZES.padding,
          }}>
          {onBoardings.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base, 17, SIZES.base],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={[styles.dot, {width: dotSize, height: dotSize}]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}>
        {onBoardings.map((item, index) => {
          return (
            <View
              key={`img-${index}`}
              style={{
                width: SIZES.width,
              }}>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={{height: '100%', width: '100%'}}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: 40,
                  right: 40,
                }}>
                <Text
                  style={{
                    ...FONTS.h1,
                    color: COLORS.gray,
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: 'center',
                    marginTop: SIZES.base,
                    color: COLORS.gray,
                  }}>
                  {item.description}
                </Text>
              </View>

              {/* Skip Button */}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 150,
                  height: 60,
                  paddingLeft: 20,
                  justifyContent: 'center',
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: COLORS.blue,
                  marginBottom: 5,
                }}
                onPress={() => console.log('Button Pressed')}>
                <Text style={{...FONTS.h1, color: COLORS.white}}>
                  {completed ? "Let's go" : 'Skip'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}

      {/* Render Dots */}
      {renderDots()}
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
