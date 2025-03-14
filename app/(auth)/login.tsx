import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { Link, router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions to continue');
      return;
    }
    
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Navigate to verification screen
    router.push('/verify');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      <View style={styles.termsContainer}>
        <Switch
          value={acceptedTerms}
          onValueChange={setAcceptedTerms}
          trackColor={{ false: '#767577', true: '#22C55E' }}
        />
        <Text style={styles.termsText}>
          I agree to the{' '}
          <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
    marginTop: 48,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  link: {
    color: '#22C55E',
    textDecorationLine: 'underline',
  },
  error: {
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
  },
});