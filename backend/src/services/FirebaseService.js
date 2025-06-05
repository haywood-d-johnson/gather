"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.FirebaseService = void 0;
const admin = __importStar(require("firebase-admin"));
class FirebaseService {
    constructor() {
        this.db = admin.firestore();
        this.rtdb = admin.database();
    }
    // User Operations
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRef = this.db.collection('users').doc();
            const userData = Object.assign(Object.assign({}, user), { id: userRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield userRef.set(userData);
            return userData;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.db.collection('users').doc(id).get();
            return doc.exists ? doc.data() : null;
        });
    }
    // Household Operations
    createHousehold(household) {
        return __awaiter(this, void 0, void 0, function* () {
            const householdRef = this.db.collection('households').doc();
            const householdData = Object.assign(Object.assign({}, household), { id: householdRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield householdRef.set(householdData);
            return householdData;
        });
    }
    // Recipe Operations
    createRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeRef = this.db.collection('recipes').doc();
            const recipeData = Object.assign(Object.assign({}, recipe), { id: recipeRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield recipeRef.set(recipeData);
            return recipeData;
        });
    }
    getHouseholdRecipes(householdId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.db
                .collection('recipes')
                .where('householdId', '==', householdId)
                .get();
            return snapshot.docs.map(doc => doc.data());
        });
    }
    // Grocery List Operations
    createGroceryList(list) {
        return __awaiter(this, void 0, void 0, function* () {
            const listRef = this.db.collection('groceryLists').doc();
            const listData = Object.assign(Object.assign({}, list), { id: listRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield listRef.set(listData);
            return listData;
        });
    }
    // Real-time grocery list updates
    watchGroceryList(listId, callback) {
        const ref = this.rtdb.ref(`groceryLists/${listId}`);
        ref.on('value', (snapshot) => {
            callback(snapshot.val());
        });
        return () => ref.off();
    }
    // Meal Plan Operations
    createMealPlan(mealPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealPlanRef = this.db.collection('mealPlans').doc();
            const mealPlanData = Object.assign(Object.assign({}, mealPlan), { id: mealPlanRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield mealPlanRef.set(mealPlanData);
            return mealPlanData;
        });
    }
    // Invite Operations
    createInvite(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            const inviteRef = this.db.collection('invites').doc();
            const inviteData = Object.assign(Object.assign({}, invite), { id: inviteRef.id, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
            yield inviteRef.set(inviteData);
            return inviteData;
        });
    }
    updateInviteStatus(inviteId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.collection('invites').doc(inviteId).update({ status });
        });
    }
}
exports.FirebaseService = FirebaseService;
