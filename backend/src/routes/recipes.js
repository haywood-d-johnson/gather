"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LocalStorageService_1 = require("../services/LocalStorageService");
const router = (0, express_1.Router)();
const storageService = new LocalStorageService_1.LocalStorageService();
// Get all recipes for a household
router.get('/household/:householdId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield storageService.getHouseholdRecipes(req.params.householdId);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
}));
// Create a new recipe
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeData = {
            householdId: req.body.householdId,
            title: req.body.title,
            description: req.body.description,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            tags: req.body.tags || [],
            imageUrl: req.body.imageUrl,
        };
        const recipe = yield storageService.createRecipe(recipeData);
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create recipe' });
    }
}));
// Update a recipe
router.put('/:recipeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.recipeId;
        const updates = req.body;
        const updatedRecipe = yield storageService.updateRecipe(recipeId, updates);
        if (!updatedRecipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.json(updatedRecipe);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
}));
// Delete a recipe
router.delete('/:recipeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.recipeId;
        const deleted = yield storageService.deleteRecipe(recipeId);
        if (!deleted) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.json({ message: 'Recipe deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
}));
exports.default = router;
