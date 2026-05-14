const fs = require('fs');

function auditLog(event) {

    fs.appendFileSync(
        'audit.log',
        JSON.stringify(event) + '
'
    );
}

module.exports = {
    auditLog
};
