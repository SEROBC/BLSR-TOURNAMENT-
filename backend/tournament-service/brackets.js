function generateBracket(players) {

    const matches = [];

    for (let i = 0; i < players.length; i += 2) {

        matches.push({
            player1: players[i],
            player2: players[i + 1]
        });
    }

    return matches;
}

module.exports = {
    generateBracket
};
