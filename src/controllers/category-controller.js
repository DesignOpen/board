var categoryService = require('../services/category-service');

function getCategories(req, res, next) {
    categoryService.getCategories()
    .then(function(categories) {
        res.json(categories);
    })
    .catch(next);
}

function getCategoryById(req, res, next) {
    categoryService.getCategoryById(req.params.id)
    .then(function(category) {
        res.json(category);
    })
    .catch(next);
}

function postCategory(req, res, next) {
    categoryService.createCategory(req.body.name)
    .then(function(category) {
        res.json(category);
    })
    .catch(next);
}

function deleteCategoryById(req, res, next) {
    categoryService.deleteCategoryById(req.params.id)
    .then(function(query) {
        res.json(query);
    })
    .catch(next);
}

function putCategoryById(req, res, next) {
    categoryService.updateCategoryById(req.params.id, req.body.name)
    .then(function(query) {
        res.json(query);
    })
    .catch(next);
}

module.exports = {
    getCategories: getCategories,
    getCategoryById: getCategoryById,
    postCategory: postCategory,
    deleteCategoryById: deleteCategoryById,
    putCategoryById: putCategoryById
};
