-- Create bridges table for storing user's affiliate bridges
CREATE TABLE IF NOT EXISTS bridges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    affiliate_url TEXT NOT NULL,
    status TEXT DEFAULT 'indexing' CHECK (status IN ('indexing', 'live', 'optimizing', 'paused')),
    traffic TEXT DEFAULT '0',
    earnings TEXT DEFAULT '$0.00',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bridges ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bridges
CREATE POLICY "Users can view own bridges" ON bridges
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own bridges
CREATE POLICY "Users can insert own bridges" ON bridges
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bridges
CREATE POLICY "Users can update own bridges" ON bridges
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own bridges
CREATE POLICY "Users can delete own bridges" ON bridges
    FOR DELETE USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bridges_user_id ON bridges(user_id);
CREATE INDEX IF NOT EXISTS idx_bridges_created_at ON bridges(created_at DESC);
