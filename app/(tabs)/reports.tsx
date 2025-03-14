import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Calendar, BarChart3, Clock, MapPin, Users, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 48;

const REPORT_METRICS = [
  {
    title: 'Total Hours',
    value: '1,245',
    change: '+12.5%',
    trend: 'up',
    icon: Clock,
  },
  {
    title: 'Active Sites',
    value: '23',
    change: '+3',
    trend: 'up',
    icon: MapPin,
  },
  {
    title: 'Team Efficiency',
    value: '94%',
    change: '+2.3%',
    trend: 'up',
    icon: Users,
  },
];

const TASK_DISTRIBUTION = [
  { type: 'Mowing', percentage: 35, color: '#22C55E' },
  { type: 'Trimming', percentage: 25, color: '#3B82F6' },
  { type: 'Leaf Blowing', percentage: 20, color: '#F59E0B' },
  { type: 'Trash Collection', percentage: 15, color: '#EF4444' },
  { type: 'Safety Inspection', percentage: 5, color: '#8B5CF6' },
];

export default function ReportsScreen() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <ScrollView style={styles.container}>
      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        <Pressable
          style={[styles.timeRangeButton, timeRange === 'week' && styles.timeRangeActive]}
          onPress={() => setTimeRange('week')}>
          <Text style={[styles.timeRangeText, timeRange === 'week' && styles.timeRangeTextActive]}>
            Week
          </Text>
        </Pressable>
        <Pressable
          style={[styles.timeRangeButton, timeRange === 'month' && styles.timeRangeActive]}
          onPress={() => setTimeRange('month')}>
          <Text style={[styles.timeRangeText, timeRange === 'month' && styles.timeRangeTextActive]}>
            Month
          </Text>
        </Pressable>
        <Pressable
          style={[styles.timeRangeButton, timeRange === 'quarter' && styles.timeRangeActive]}
          onPress={() => setTimeRange('quarter')}>
          <Text style={[styles.timeRangeText, timeRange === 'quarter' && styles.timeRangeTextActive]}>
            Quarter
          </Text>
        </Pressable>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        {REPORT_METRICS.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <metric.icon size={20} color="#64748B" />
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <View style={styles.metricTrend}>
              <TrendingUp size={16} color={metric.trend === 'up' ? '#22C55E' : '#EF4444'} />
              <Text style={[styles.metricChange, { color: metric.trend === 'up' ? '#22C55E' : '#EF4444' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Task Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Distribution</Text>
        <View style={styles.taskDistribution}>
          {TASK_DISTRIBUTION.map((task, index) => (
            <View key={index} style={styles.taskRow}>
              <View style={styles.taskLabelContainer}>
                <View style={[styles.taskDot, { backgroundColor: task.color }]} />
                <Text style={styles.taskLabel}>{task.type}</Text>
              </View>
              <View style={styles.taskBarContainer}>
                <View style={[styles.taskBar, { width: `${task.percentage}%`, backgroundColor: task.color }]} />
                <Text style={styles.taskPercentage}>{task.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Export Actions */}
      <View style={styles.exportSection}>
        <Pressable style={styles.exportButton}>
          <BarChart3 size={20} color="#22C55E" />
          <Text style={styles.exportButtonText}>Export Report</Text>
        </Pressable>
        <Pressable style={[styles.exportButton, styles.scheduleButton]}>
          <Calendar size={20} color="white" />
          <Text style={[styles.exportButtonText, styles.scheduleButtonText]}>Schedule Report</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  timeRangeActive: {
    backgroundColor: '#22C55E',
  },
  timeRangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  timeRangeTextActive: {
    color: 'white',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  metricCard: {
    width: (CHART_WIDTH - 24) / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 4,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChange: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16,
  },
  taskDistribution: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskRow: {
    gap: 12,
  },
  taskLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  taskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  taskBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskBar: {
    height: 8,
    borderRadius: 4,
  },
  taskPercentage: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    width: 40,
  },
  exportSection: {
    padding: 16,
    gap: 12,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  scheduleButton: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  exportButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#22C55E',
  },
  scheduleButtonText: {
    color: 'white',
  },
});