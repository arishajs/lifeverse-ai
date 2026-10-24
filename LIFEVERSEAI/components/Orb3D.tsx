import { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Orb3D() {
  const spin = useRef(new Animated.Value(0)).current;
  const spinRev = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1, duration: 12000,
        easing: Easing.linear, useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(spinRev, {
        toValue: 1, duration: 8000,
        easing: Easing.linear, useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateRev = spinRev.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });
  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] });
  const glow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.8] });

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.glow, { opacity: glow, transform: [{ scale }] }]} />

      <Animated.View style={[styles.ring, { transform: [{ rotateX: '65deg' }, { rotateZ: rotate }] }]} />
      <Animated.View style={[styles.ring2, { transform: [{ rotateY: '65deg' }, { rotateZ: rotateRev }] }]} />

      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={['#22d3ee', '#7c5cff']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.core}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute', width: 230, height: 230, borderRadius: 115,
    backgroundColor: '#7c5cff',
  },
  core: { width: 140, height: 140, borderRadius: 70 },
  ring: {
    position: 'absolute', width: 220, height: 220, borderRadius: 110,
    borderWidth: 3, borderColor: '#22d3ee',
  },
  ring2: {
    position: 'absolute', width: 190, height: 190, borderRadius: 95,
    borderWidth: 3, borderColor: '#a78bfa',
  },
});