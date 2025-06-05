import { Router, Response, Request } from 'express';
import { LocalStorageService } from '../services/LocalStorageService';
import { Recipe } from '../models/types';

const router = Router();
const storageService = new LocalStorageService();

// Get all recipes for a household
router.get(
  '/household/:householdId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes = await storageService.getHouseholdRecipes(req.params.householdId);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }
);

// Create a new recipe
router.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const recipeData: Omit<Recipe, 'id' | 'createdAt'> = {
        householdId: req.body.householdId,
        title: req.body.title,
        description: req.body.description,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        tags: req.body.tags || [],
        imageUrl: req.body.imageUrl,
      };

      const recipe = await storageService.createRecipe(recipeData);
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  }
);

// Update a recipe
router.put(
  '/:recipeId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const recipeId = req.params.recipeId;
      const updates = req.body;

      const updatedRecipe = await storageService.updateRecipe(recipeId, updates);
      if (!updatedRecipe) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  }
);

// Delete a recipe
router.delete(
  '/:recipeId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const recipeId = req.params.recipeId;
      const deleted = await storageService.deleteRecipe(recipeId);

      if (!deleted) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  }
);

export default router;
