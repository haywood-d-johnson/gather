// Firestore Schema Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  householdIds: string[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Household {
  id: string;
  name: string;
  ownerId: string;
  members: {
    [userId: string]: {
      role: 'admin' | 'member' | 'viewer';
      joinedAt: FirebaseFirestore.Timestamp;
    };
  };
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Recipe {
  id: string;
  householdId: string;
  name: string;
  description?: string;
  servings: number;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    category?: string; // for grocery list organization
  }[];
  instructions: string[];
  tags: string[];
  createdBy: string; // userId
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface GroceryList {
  id: string;
  householdId: string;
  name: string;
  items: {
    [category: string]: {
      name: string;
      amount: number;
      unit: string;
      checked: boolean;
      addedBy: string; // userId
      addedAt: FirebaseFirestore.Timestamp;
    }[];
  };
  recipeIds: string[]; // references to recipes used
  createdBy: string; // userId
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface MealPlan {
  id: string;
  householdId: string;
  weekStartDate: FirebaseFirestore.Timestamp;
  meals: {
    [date: string]: {
      breakfast?: { recipeId: string; servings: number; };
      lunch?: { recipeId: string; servings: number; };
      dinner?: { recipeId: string; servings: number; };
    };
  };
  createdBy: string; // userId
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

// Realtime Database Types
export interface RTDBPresence {
  [householdId: string]: {
    [userId: string]: {
      status: 'online' | 'offline';
      lastSeen: number; // timestamp
      currentScreen?: string;
    };
  };
}

export interface RTDBGroceryListLive {
  [householdId: string]: {
    [listId: string]: {
      activeUsers: {
        [userId: string]: {
          status: 'viewing' | 'editing';
          lastActivity: number; // timestamp
        };
      };
      recentChanges: {
        itemId: string;
        action: 'add' | 'remove' | 'check' | 'uncheck';
        by: string; // userId
        timestamp: number;
      }[];
    };
  };
}
