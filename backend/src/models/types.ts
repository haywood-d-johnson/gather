export type UserRole = 'admin' | 'member' | 'viewer';
export type InviteStatus = 'pending' | 'accepted' | 'expired';

export interface User {
  id: string;
  email: string;
  name?: string;
  householdId?: string;
  role: UserRole;
  createdAt: Date;
}

export interface Household {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  servings?: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
}

export interface GroceryItem {
  name: string;
  category: string;
  checked: boolean;
}

export interface GroceryList {
  id: string;
  householdId: string;
  title: string;
  items: GroceryItem[];
  createdAt: Date;
}

export interface MealPlan {
  id: string;
  householdId: string;
  date: Date;
  meals: {
    [mealType: string]: string; // recipeId
  };
  createdAt: Date;
}

export interface Invite {
  id: string;
  email: string;
  householdId: string;
  status: InviteStatus;
  token: string;
  createdAt: Date;
}
