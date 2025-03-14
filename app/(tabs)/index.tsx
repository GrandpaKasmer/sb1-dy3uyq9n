import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, Calendar } from 'lucide-react-native';

const RECENT_TASKS = [
  {
    id: '1',
    worker: 'John Doe',
    task: 'Mowing',
    location: 'Central Park',
    duration: '2h 15m',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    worker: 'Sarah Smith',
    task: 'Trimming',
    location: 'Riverside Gardens',
    duration: '1h 45m',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=200',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    worker: 'Mike Johnson',
    task: 'Leaf Blowing',
    location: 'Memorial Park',
    duration: '1h 30m',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=200',
    timestamp: '4 hours ago'
  }
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Active Workers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Tasks Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156h</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton} onPress={() => router.push('/team')}>
            <Users size={24} color="#22C55E" />
            <Text style={styles.actionText}>Manage Team</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/reports')}>
            <FileText size={24} color="#22C55E" />
            <Text style={styles.actionText}>View Reports</Text>
          </Pressable>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {RECENT_TASKS.map(task => (
          <View key={task.id} style={styles.activityCard}>
            <Image source={{ uri: task.image }} style={styles.workerImage} />
            <View style={styles.activityInfo}>
              <View style={styles.activityHeader}>
                <Text style={styles.workerName}>{task.worker}</Text>
                <Text style={styles.timestamp}>{task.timestamp}</Text>
              </View>
              <Text style={styles.taskName}>{task.task}</Text>
              <View style={styles.activityDetails}>
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.detailText}>{task.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#64748B" />
                  <Text style={styles.detailText}>{task.duration}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#22C55E',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
    marginTop: 8,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  workerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  workerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  taskName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#22C55E',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
});