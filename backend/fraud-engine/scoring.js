function calculateRisk(signals) {

    let score = 0;

    if (signals.vpn) score += 20;
    if (signals.emulator) score += 30;
    if (signals.linkedAccounts) score += 80;
    if (signals.impossibleAim) score += 90;

    return score;
}

module.exports = {
    calculateRisk
};
