CREATE TABLE players (
    id UUID PRIMARY KEY,
    username TEXT UNIQUE,
    mmr INTEGER DEFAULT 1500,
    fraud_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
    id UUID PRIMARY KEY,
    player1 UUID,
    player2 UUID,
    winner UUID,
    replay_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tournaments (
    id UUID PRIMARY KEY,
    name TEXT,
    prize_pool BIGINT,
    status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
    user_id UUID PRIMARY KEY,
    balance BIGINT DEFAULT 0,
    locked_balance BIGINT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE replay_events (
    id UUID PRIMARY KEY,
    match_id UUID,
    frame INTEGER,
    payload JSONB
);
