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
exports.LocalStorageService = void 0;
const uuid_1 = require("uuid");
// In-memory storage
const storage = {
    users: new Map(),
    households: new Map(),
    recipes: new Map(),
    groceryLists: new Map(),
    mealPlans: new Map(),
    invites: new Map()
};
class LocalStorageService {
    // Recipe Operations
    createRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const newRecipe = Object.assign(Object.assign({}, recipe), { id, createdAt: new Date() });
            storage.recipes.set(id, newRecipe);
            return newRecipe;
        });
    }
    getHouseholdRecipes(householdId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(storage.recipes.values())
                .filter(recipe => recipe.householdId === householdId);
        });
    }
    getRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage.recipes.get(id) || null;
        });
    }
    updateRecipe(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = storage.recipes.get(id);
            if (!recipe)
                return null;
            const updatedRecipe = Object.assign(Object.assign({}, recipe), updates);
            storage.recipes.set(id, updatedRecipe);
            return updatedRecipe;
        });
    }
    deleteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage.recipes.delete(id);
        });
    }
    // User Operations (simplified for local development)
    createUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const user = {
                id,
                email,
                role: 'member',
                createdAt: new Date()
            };
            storage.users.set(id, user);
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage.users.get(id) || null;
        });
    }
}
exports.LocalStorageService = LocalStorageService;
