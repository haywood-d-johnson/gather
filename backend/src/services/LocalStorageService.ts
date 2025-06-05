import { User, Household, Recipe, GroceryList, MealPlan, Invite } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
const storage = {
  users: new Map<string, User>(),
  households: new Map<string, Household>(),
  recipes: new Map<string, Recipe>(),
  groceryLists: new Map<string, GroceryList>(),
  mealPlans: new Map<string, MealPlan>(),
  invites: new Map<string, Invite>()
};

export class LocalStorageService {
  // Recipe Operations
  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt'>): Promise<Recipe> {
    const id = uuidv4();
    const newRecipe = {
      ...recipe,
      id,
      createdAt: new Date()
    };
    storage.recipes.set(id, newRecipe);
    return newRecipe;
  }

  async getHouseholdRecipes(householdId: string): Promise<Recipe[]> {
    return Array.from(storage.recipes.values())
      .filter(recipe => recipe.householdId === householdId);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return storage.recipes.get(id) || null;
  }

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const recipe = storage.recipes.get(id);
    if (!recipe) return null;

    const updatedRecipe = { ...recipe, ...updates };
    storage.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    return storage.recipes.delete(id);
  }

  // User Operations (simplified for local development)
  async createUser(email: string): Promise<User> {
    const id = uuidv4();
    const user: User = {
      id,
      email,
      role: 'member',
      createdAt: new Date()
    };
    storage.users.set(id, user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return storage.users.get(id) || null;
  }
}
