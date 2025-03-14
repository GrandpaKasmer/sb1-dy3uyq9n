import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          source={require('@/assets/animations/launch.json')}
          autoPlay={false}
          loop={false}
          style={styles.animation}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>TerraTime Grounds</Text>
        <Text style={styles.subtitle}>Streamline your grounds maintenance operations</Text>
        
        <Link href="/login" style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#22C55E',
  },
});