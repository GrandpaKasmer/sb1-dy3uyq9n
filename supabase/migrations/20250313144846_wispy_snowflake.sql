/*
  # Add subscription tiers and organization management

  1. New Tables
    - `subscription_tiers`: Defines available subscription plans
    - Updates to existing tables for organization support
  
  2. Changes
    - Add organization support to existing tables
    - Add subscription management features
    - Add member limit enforcement
  
  3. Security
    - Enable RLS on new tables
    - Add policies for subscription and organization management
*/

-- Create subscription_tiers table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscription_tiers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    max_users int NOT NULL,
    max_supervisors int NOT NULL,
    max_owners int NOT NULL,
    price_monthly decimal(10,2) NOT NULL,
    price_yearly decimal(10,2) NOT NULL,
    features jsonb NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Add organization_id to user_profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'organization_id'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN organization_id uuid REFERENCES organizations;
    END IF;
END $$;

-- Enable RLS on subscription_tiers
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Create policies using DO blocks to check for existence
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Anyone can view subscription tiers" ON subscription_tiers;
    DROP POLICY IF EXISTS "Organization owners can manage their organization" ON organizations;
    DROP POLICY IF EXISTS "Members can view their organization" ON organizations;
    DROP POLICY IF EXISTS "Organization owners can manage members" ON organization_members;
    DROP POLICY IF EXISTS "Members can view organization members" ON organization_members;

    -- Create new policies
    CREATE POLICY "Anyone can view subscription tiers"
        ON subscription_tiers
        FOR SELECT
        TO authenticated
        USING (true);

    CREATE POLICY "Organization owners can manage their organization"
        ON organizations
        FOR ALL
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM organization_members
                WHERE organization_id = organizations.id
                AND user_id = auth.uid()
                AND role = 'owner'
            )
        );

    CREATE POLICY "Members can view their organization"
        ON organizations
        FOR SELECT
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM organization_members
                WHERE organization_id = organizations.id
                AND user_id = auth.uid()
            )
        );

    CREATE POLICY "Organization owners can manage members"
        ON organization_members
        FOR ALL
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM organization_members
                WHERE organization_id = organization_members.organization_id
                AND user_id = auth.uid()
                AND role = 'owner'
            )
        );

    CREATE POLICY "Members can view organization members"
        ON organization_members
        FOR SELECT
        TO authenticated
        USING (
            organization_id IN (
                SELECT organization_id FROM organization_members
                WHERE user_id = auth.uid()
            )
        );
END $$;

-- Create function to check subscription limits
CREATE OR REPLACE FUNCTION check_organization_limits()
RETURNS trigger AS $$
DECLARE
    worker_count integer;
    supervisor_count integer;
    owner_count integer;
    max_users integer;
    max_supervisors integer;
    max_owners integer;
BEGIN
    -- Get current counts
    SELECT 
        COUNT(*) FILTER (WHERE role = 'worker'),
        COUNT(*) FILTER (WHERE role = 'supervisor'),
        COUNT(*) FILTER (WHERE role = 'owner')
    INTO 
        worker_count,
        supervisor_count,
        owner_count
    FROM organization_members
    WHERE organization_id = NEW.organization_id;

    -- Get subscription limits
    SELECT 
        st.max_users,
        st.max_supervisors,
        st.max_owners
    INTO
        max_users,
        max_supervisors,
        max_owners
    FROM organizations o
    JOIN subscription_tiers st ON o.subscription_tier_id = st.id
    WHERE o.id = NEW.organization_id;

    -- Check limits
    IF NEW.role = 'worker' AND worker_count >= max_users THEN
        RAISE 'Maximum number of workers (%) reached for this subscription tier', max_users;
    END IF;

    IF NEW.role = 'supervisor' AND supervisor_count >= max_supervisors THEN
        RAISE 'Maximum number of supervisors (%) reached for this subscription tier', max_supervisors;
    END IF;

    IF NEW.role = 'owner' AND owner_count >= max_owners THEN
        RAISE 'Maximum number of owners (%) reached for this subscription tier', max_owners;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for checking limits
DO $$ 
BEGIN
    DROP TRIGGER IF EXISTS check_organization_limits_trigger ON organization_members;
    
    CREATE TRIGGER check_organization_limits_trigger
        BEFORE INSERT OR UPDATE ON organization_members
        FOR EACH ROW
        EXECUTE FUNCTION check_organization_limits();
END $$;

-- Insert default subscription tiers
INSERT INTO subscription_tiers (name, description, max_users, max_supervisors, max_owners, price_monthly, price_yearly, features)
SELECT 'Free', 'Perfect for small teams just getting started', 10, 1, 1, 0, 0,
'{
    "task_tracking": true,
    "basic_reporting": true,
    "photo_documentation": true,
    "voice_notes": false,
    "advanced_analytics": false,
    "custom_workflows": false,
    "priority_support": false,
    "api_access": false
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_tiers WHERE name = 'Free');

INSERT INTO subscription_tiers (name, description, max_users, max_supervisors, max_owners, price_monthly, price_yearly, features)
SELECT 'Professional', 'Ideal for growing organizations', 25, 2, 1, 99.99, 999.99,
'{
    "task_tracking": true,
    "basic_reporting": true,
    "photo_documentation": true,
    "voice_notes": true,
    "advanced_analytics": true,
    "custom_workflows": false,
    "priority_support": false,
    "api_access": false
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_tiers WHERE name = 'Professional');

INSERT INTO subscription_tiers (name, description, max_users, max_supervisors, max_owners, price_monthly, price_yearly, features)
SELECT 'Enterprise', 'Complete solution for large organizations', 100, 10, 2, 299.99, 2999.99,
'{
    "task_tracking": true,
    "basic_reporting": true,
    "photo_documentation": true,
    "voice_notes": true,
    "advanced_analytics": true,
    "custom_workflows": true,
    "priority_support": true,
    "api_access": true
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_tiers WHERE name = 'Enterprise');