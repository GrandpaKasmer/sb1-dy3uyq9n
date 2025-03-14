import { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Camera, Mic, ArrowLeft, Check, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

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

export default function TaskCompletionScreen() {
  const { id, duration } = useLocalSearchParams();
  const task = TASKS[id as keyof typeof TASKS];
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setVoiceNote('Voice note recorded');
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  const handleSubmit = () => {
    // Here you would upload the data to your backend
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Task</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.taskInfo}>
          <Image source={{ uri: task.icon }} style={styles.taskIcon} />
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.duration}>Duration: {formatDuration(Number(duration))}</Text>
        </View>

        <View style={styles.documentation}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photo Documentation</Text>
            <TouchableOpacity onPress={takePhoto} style={styles.documentButton}>
              <Camera size={24} color="#22C55E" />
              <Text style={styles.documentButtonText}>Take Photo</Text>
            </TouchableOpacity>
            {photo && (
              <View style={styles.preview}>
                <Image source={{ uri: photo }} style={styles.photoPreview} />
                <TouchableOpacity 
                  onPress={() => setPhoto(null)} 
                  style={styles.removeButton}>
                  <X size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voice Note</Text>
            <TouchableOpacity 
              onPress={toggleRecording} 
              style={[
                styles.documentButton,
                isRecording && styles.recordingButton,
              ]}>
              <Mic size={24} color={isRecording ? 'white' : '#22C55E'} />
              <Text 
                style={[
                  styles.documentButtonText,
                  isRecording && styles.recordingText,
                ]}>
                {isRecording ? 'Recording...' : 'Record Voice Note'}
              </Text>
            </TouchableOpacity>
            {voiceNote && (
              <View style={styles.voiceNotePreview}>
                <Text style={styles.voiceNoteText}>{voiceNote}</Text>
                <TouchableOpacity 
                  onPress={() => setVoiceNote(null)} 
                  style={styles.removeButton}>
                  <X size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>Back to Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSubmit} 
            style={[styles.button, styles.primaryButton]}>
            <Check size={24} color="white" />
            <Text style={styles.primaryButtonText}>Submit Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  taskInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  taskIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  taskTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  duration: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  documentation: {
    flex: 1,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
    gap: 8,
  },
  documentButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#22C55E',
  },
  recordingButton: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  recordingText: {
    color: 'white',
  },
  preview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  voiceNotePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  voiceNoteText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#22C55E',
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#64748B',
  },
});