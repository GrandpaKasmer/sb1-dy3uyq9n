import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Play, Pause, StopCircle, ArrowLeft, Check } from 'lucide-react-native';
import * as Location from 'expo-location';

const TASKS = {
  mowing: {
    title: 'Mowing',
    icon: 'https://i.ibb.co/G3GhFqtf/Mower.png',
  },
  trash: {
    title: 'Trash Collection',
    icon: 'https://i.ibb.co/ZCSyQYC/wastemgmt.png',
  },
  trimming: {
    title: 'Trimming',
    icon: 'https://i.ibb.co/hFHK2bvG/Trimmer.png',
  },
  blowing: {
    title: 'Leaf Blowing',
    icon: 'https://i.ibb.co/cc9TLg4q/Blower-icon.png',
  },
  safety: {
    title: 'Safety Inspection',
    icon: 'https://i.ibb.co/xSkXpDsh/Safety-Construction.png',
  },
};

export default function TaskScreen() {
  const { id } = useLocalSearchParams();
  const task = TASKS[id as keyof typeof TASKS];

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleComplete = () => {
    router.push({
      pathname: '/task/complete',
      params: {
        id,
        duration: time,
        lat: location?.coords.latitude,
        lng: location?.coords.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{task.title}</Text>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: task.icon }} style={styles.taskIcon} />
        
        <Text style={styles.timer}>{formatTime(time)}</Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => setIsRunning(!isRunning)}
            style={[styles.button, styles.buttonSecondary]}>
            {isRunning ? (
              <Pause color="#22C55E" size={32} />
            ) : (
              <Play color="#22C55E" size={32} />
            )}
          </TouchableOpacity>

          {isRunning && (
            <TouchableOpacity
              onPress={handleComplete}
              style={[styles.button, styles.buttonPrimary]}>
              <Check color="white" size={32} />
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}

          {time > 0 && !isRunning && (
            <TouchableOpacity
              onPress={() => setTime(0)}
              style={[styles.button, styles.buttonDanger]}>
              <StopCircle color="white" size={32} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  taskIcon: {
    width: 120,
    height: 120,
    marginBottom: 48,
  },
  timer: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: 'white',
    marginBottom: 48,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: '#16A34A',
    width: 'auto',
    paddingHorizontal: 32,
    flexDirection: 'row',
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  completeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
  },
});