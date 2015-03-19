var mongoose = require('mongoose');
var Category = mongoose.model('Category');

function createCategory(name) {
    var category = new Category({
        name: name
    });

    return category.saveAsync();
}

function getCategories() {
    return Category.findAsync({});
}

function getCategoryById(id) {
    return Category.findOneAsync({_id: id});
}

function deleteCategoryById(id) {
    return Category.removeAsync({_id: id});
}

function updateCategoryById(id, name) {
    return Category.findOneAndUpdateAsync({_id: id}, {name: name});
}

module.exports = {
    createCategory: createCategory,
    getCategories: getCategories,
    getCategoryById: getCategoryById,
    deleteCategoryById: deleteCategoryById,
    updateCategoryById: updateCategoryById
};
