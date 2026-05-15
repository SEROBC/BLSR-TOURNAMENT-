function reviewTransaction(tx) {

    if (tx.amount > 1000000)
        return 'REVIEW';

    return 'APPROVED';
}

module.exports = {
    reviewTransaction
};
