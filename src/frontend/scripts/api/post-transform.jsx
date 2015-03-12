var moment = require('moment');

function transformPost(postJson) {
    postJson.createdAt = moment(postJson.createdAt);
    postJson.modifiedAt = moment(postJson.modifiedAt);
    return postJson;
}

module.exports = {
    transformPost: transformPost
};
