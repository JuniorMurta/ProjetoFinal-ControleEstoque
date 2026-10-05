import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category, Movement, Product } from '../types';

const PRODUCTS_KEY = '@estoque:products';
const MOVEMENTS_KEY = '@estoque:movements';
const CATEGORIES_KEY = '@estoque:categories';

export type InventoryData = {
  products: Product[];
  movements: Movement[];
  categories: Category[];
};

export async function loadInventory(): Promise<Partial<InventoryData>> {
  const [productsJson, movementsJson, categoriesJson] = await Promise.all([
    AsyncStorage.getItem(PRODUCTS_KEY),
    AsyncStorage.getItem(MOVEMENTS_KEY),
    AsyncStorage.getItem(CATEGORIES_KEY),
  ]);

  return {
    products: productsJson ? JSON.parse(productsJson) : undefined,
    movements: movementsJson ? JSON.parse(movementsJson) : undefined,
    categories: categoriesJson ? JSON.parse(categoriesJson) : undefined,
  };
}

export async function saveInventory(data: InventoryData): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(data.products)),
    AsyncStorage.setItem(MOVEMENTS_KEY, JSON.stringify(data.movements)),
    AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(data.categories)),
  ]);
}
