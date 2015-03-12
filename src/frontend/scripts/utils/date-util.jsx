var moment = require('moment');

function humanizeDiffToNow(momentDate) {
    var diff = momentDate.diff(moment());
    return moment.duration(diff).humanize();
}

module.exports = {
    humanizeDiffToNow: humanizeDiffToNow
};
