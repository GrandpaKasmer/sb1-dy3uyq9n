import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'TerraTime Grounds',
  slug: 'terratime-grounds',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#22C55E'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.terratime.grounds',
    buildNumber: '1',
    infoPlist: {
      NSCameraUsageDescription: 'TerraTime needs camera access to document completed work. Photos provide verification of task completion and quality.',
      NSLocationWhenInUseUsageDescription: 'TerraTime needs your location to track where tasks are performed. This helps supervisors verify work and improves service quality.',
      NSMicrophoneUsageDescription: 'TerraTime needs microphone access to record voice notes. This allows you to provide additional details about completed tasks.',
      UIBackgroundModes: ['location', 'fetch']
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#22C55E'
    },
    package: 'com.terratime.grounds',
    versionCode: 1,
    permissions: [
      'CAMERA',
      'RECORD_AUDIO',
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION'
    ]
  },
  plugins: [
    'expo-location',
    'expo-camera',
    [
      'expo-image-picker',
      {
        photosPermission: 'TerraTime needs access to your photos to save task documentation.',
        cameraPermission: 'TerraTime needs camera access to document completed work.'
      }
    ]
  ],
  extra: {
    eas: {
      projectId: 'your-project-id'
    }
  }
};

export default config;