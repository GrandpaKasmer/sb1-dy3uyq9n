import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable } from 'react-native';
import { Search, Plus, ChevronRight } from 'lucide-react-native';

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Grounds Worker',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
    status: 'active',
    tasks: 245,
  },
  {
    id: '2',
    name: 'Sarah Smith',
    role: 'Team Lead',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    status: 'active',
    tasks: 312,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Grounds Worker',
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=200',
    status: 'break',
    tasks: 178,
  },
];

export default function TeamScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search and Add */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search team members..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable style={styles.addButton}>
          <Plus size={24} color="white" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Team Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Total Members</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>On Break</Text>
          </View>
        </View>

        {/* Team List */}
        <View style={styles.teamList}>
          <Text style={styles.sectionTitle}>Team Members</Text>
          {TEAM_MEMBERS.map(member => (
            <Pressable key={member.id} style={styles.memberCard}>
              <Image source={{ uri: member.image }} style={styles.memberImage} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <View style={styles.memberStats}>
                  <View style={[styles.statusBadge, { backgroundColor: member.status === 'active' ? '#22C55E' : '#EAB308' }]}>
                    <Text style={styles.statusText}>{member.status === 'active' ? 'Active' : 'On Break'}</Text>
                  </View>
                  <Text style={styles.tasksCompleted}>{member.tasks} tasks</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#64748B" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    padding: 16,
    gap: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#22C55E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
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
  teamList: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 12,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  memberImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 2,
  },
  memberRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  memberStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'white',
  },
  tasksCompleted: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
});