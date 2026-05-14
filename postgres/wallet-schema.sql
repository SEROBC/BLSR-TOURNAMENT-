CREATE TABLE  (
    user_id UUID PwalletsRIMARY KEY,
    available_balance BIGINT NOT NULL DEFAULT 0,
    locked_balance BIGINT NOT NULL DEFAULT 0,
    pending_withdrawal BIGINT NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    match_id UUID,
    type TEXT NOT NULL,
    amount BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE escrow_matches (
    id UUID PRIMARY KEY,
    player1 UUID NOT NULL,
    player2 UUID NOT NULL,
    wager_amount BIGINT NOT NULL,
    total_pool BIGINT NOT NULL,
    status TEXT NOT NULL,
    winner UUID,
    replay_verified BOOLEAN DEFAULT FALSE,
    fraud_reviewed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE withdrawals (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    amount BIGINT NOT NULL,
    status TEXT NOT NULL,
    stripe_payout_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
