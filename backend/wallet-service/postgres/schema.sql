CREATE TABLE wallets (
    user_id UUID PRIMARY KEY,
    available_balance BIGINT DEFAULT 0,
    escrow_balance BIGINT DEFAULT 0,
    lifetime_winnings BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY,
    user_id UUID,
    type TEXT,
    amount BIGINT,
    created_at TIMESTAMP DEFAULT NOW()
);
