var ajax = require('../utils/ajax-util.jsx').ajax;

function getReposById(id) {
    return ajax('/api/users/' + id + '/repos');
}

module.exports = {
    getReposById: getReposById
};
