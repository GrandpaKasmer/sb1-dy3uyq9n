import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Check, Crown, Shield, Star } from 'lucide-react-native';

const SUBSCRIPTION_TIERS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for small teams just getting started',
    price: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      users: 10,
      supervisors: 1,
      owners: 1,
    },
    features: [
      'Task tracking',
      'Basic reporting',
      'Photo documentation',
    ],
    icon: Shield,
    color: '#64748B',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Ideal for growing organizations',
    price: {
      monthly: 99.99,
      yearly: 999.99,
    },
    limits: {
      users: 25,
      supervisors: 2,
      owners: 1,
    },
    features: [
      'Everything in Free, plus:',
      'Voice notes',
      'Advanced analytics',
      'Team performance tracking',
    ],
    icon: Star,
    color: '#22C55E',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    price: {
      monthly: 299.99,
      yearly: 2999.99,
    },
    limits: {
      users: 100,
      supervisors: 10,
      owners: 2,
    },
    features: [
      'Everything in Professional, plus:',
      'Custom workflows',
      'Priority support',
      'API access',
    ],
    icon: Crown,
    color: '#6366F1',
  },
];

export default function SubscriptionScreen() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string>('free');

  return (
    <ScrollView style={styles.container}>
      {/* Billing Cycle Toggle */}
      <View style={styles.billingToggle}>
        <Text style={styles.billingLabel}>Monthly</Text>
        <Switch
          value={billingCycle === 'yearly'}
          onValueChange={(value) => setBillingCycle(value ? 'yearly' : 'monthly')}
          trackColor={{ false: '#E2E8F0', true: '#22C55E' }}
          thumbColor="white"
        />
        <View style={styles.yearlyLabel}>
          <Text style={styles.billingLabel}>Yearly</Text>
          <Text style={styles.savingsLabel}>Save 20%</Text>
        </View>
      </View>

      {/* Subscription Tiers */}
      <View style={styles.tiersContainer}>
        {SUBSCRIPTION_TIERS.map((tier) => (
          <Pressable
            key={tier.id}
            style={[
              styles.tierCard,
              selectedTier === tier.id && styles.selectedTier,
              tier.popular && styles.popularTier,
            ]}
            onPress={() => setSelectedTier(tier.id)}>
            {tier.popular && <Text style={styles.popularBadge}>Most Popular</Text>}
            
            <View style={[styles.tierIcon, { backgroundColor: tier.color }]}>
              <tier.icon size={24} color="white" />
            </View>
            
            <Text style={styles.tierName}>{tier.name}</Text>
            <Text style={styles.tierDescription}>{tier.description}</Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.currency}>$</Text>
              <Text style={styles.price}>
                {billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly}
              </Text>
              <Text style={styles.billingPeriod}>
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </Text>
            </View>

            <View style={styles.limitsContainer}>
              <Text style={styles.limitsTitle}>Includes:</Text>
              <Text style={styles.limitItem}>• Up to {tier.limits.users} team members</Text>
              <Text style={styles.limitItem}>• {tier.limits.supervisors} supervisor{tier.limits.supervisors > 1 ? 's' : ''}</Text>
              <Text style={styles.limitItem}>• {tier.limits.owners} owner{tier.limits.owners > 1 ? 's' : ''}</Text>
            </View>

            <View style={styles.featuresContainer}>
              {tier.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={tier.color} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Pressable
              style={[
                styles.selectButton,
                { backgroundColor: selectedTier === tier.id ? tier.color : 'transparent' },
              ]}>
              <Text
                style={[
                  styles.selectButtonText,
                  { color: selectedTier === tier.id ? 'white' : tier.color },
                ]}>
                {selectedTier === tier.id ? 'Current Plan' : 'Select Plan'}
              </Text>
            </Pressable>
          </Pressable>
        ))}
      </View>

      {/* Contact Sales */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need a custom plan?</Text>
        <Text style={styles.contactDescription}>
          Contact our sales team for a tailored solution that fits your organization's needs.
        </Text>
        <Pressable style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Sales</Text>
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
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  billingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 8,
  },
  yearlyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#22C55E',
    marginLeft: 4,
  },
  tiersContainer: {
    padding: 16,
    gap: 16,
  },
  tierCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedTier: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  popularTier: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: '#22C55E',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  tierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
    marginBottom: 8,
  },
  tierDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  currency: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#0F172A',
  },
  billingPeriod: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginLeft: 4,
  },
  limitsContainer: {
    marginBottom: 24,
  },
  limitsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 8,
  },
  limitItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  featuresContainer: {
    gap: 8,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  selectButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  contactSection: {
    padding: 24,
    backgroundColor: '#F1F5F9',
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 8,
  },
  contactDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});