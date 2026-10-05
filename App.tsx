import React, { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import ProductsScreen from './src/screen/ProductsScreen';
import ProductFormScreen from './src/screen/ProductFormScreen';
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import MovementsScreen from './src/screen/MovementsScreen';
import MovementFormScreen from './src/screen/MovementFormScreen';
import { Category, Movement, Product } from './src/types';
import { loadInventory, saveInventory } from './src/storage/inventoryStorage';

// Dados iniciais usados como banco local para demonstrar o funcionamento do projeto.
const initialProducts: Product[] = [
  { id: '1', name: 'Arroz 5 kg', description: 'Arroz branco tipo 1, pacote de 5 kg.', categoryId: 'c1', category: 'Alimentos', price: 24.9, quantity: 3, minQuantity: 5, icon: '🍚' },
  { id: '2', name: 'Feijão 1 kg', description: 'Feijão carioca selecionado, pacote de 1 kg.', categoryId: 'c1', category: 'Alimentos', price: 8.5, quantity: 2, minQuantity: 5, icon: '🫘' },
  { id: '3', name: 'Óleo de Soja 900 ml', description: 'Óleo de soja refinado, embalagem de 900 ml.', categoryId: 'c1', category: 'Alimentos', price: 6.9, quantity: 15, minQuantity: 5, icon: '🫗' },
  { id: '4', name: 'Açúcar 1 kg', description: 'Açúcar cristal, pacote de 1 kg.', categoryId: 'c1', category: 'Alimentos', price: 5.2, quantity: 5, minQuantity: 5, icon: '🧂' },
  { id: '5', name: 'Leite Integral 1 L', description: 'Leite integral UHT, embalagem de 1 litro.', categoryId: 'c2', category: 'Laticínios', price: 4.5, quantity: 20, minQuantity: 5, icon: '🥛' },
  { id: '6', name: 'Macarrão Espaguete 500 g', description: 'Massa tipo espaguete, pacote de 500 g.', categoryId: 'c1', category: 'Alimentos', price: 3.9, quantity: 10, minQuantity: 5, icon: '🍝' },
  { id: '7', name: 'Café 500 g', description: 'Café torrado e moído, pacote de 500 g.', categoryId: 'c3', category: 'Bebidas', price: 18.9, quantity: 40, minQuantity: 5, icon: '☕' },
];

const initialCategories: Category[] = [
  { id: 'c1', name: 'Alimentos' },
  { id: 'c2', name: 'Laticínios' },
  { id: 'c3', name: 'Bebidas' },
];

// Histórico inicial de movimentações exibido na tela de Movimentações.
const initialMovements: Movement[] = [
  { id: 'm1', productId: '1', productName: 'Arroz 5 kg', type: 'entrada', quantity: 20, date: '20/09/2026', time: '10:15', stockAfter: 23 },
  { id: 'm2', productId: '2', productName: 'Feijão 1 kg', type: 'saida', quantity: 5, date: '21/09/2026', time: '14:30', stockAfter: 2 },
  { id: 'm3', productId: '3', productName: 'Óleo de Soja 900 ml', type: 'entrada', quantity: 10, date: '19/09/2026', time: '09:20', stockAfter: 25 },
  { id: 'm4', productId: '4', productName: 'Açúcar 1 kg', type: 'saida', quantity: 8, date: '18/09/2026', time: '16:45', stockAfter: 5 },
  { id: 'm5', productId: '5', productName: 'Leite Integral 1 L', type: 'entrada', quantity: 15, date: '17/09/2026', time: '11:10', stockAfter: 35 },
  { id: 'm6', productId: '6', productName: 'Macarrão Espaguete 500 g', type: 'saida', quantity: 12, date: '16/09/2026', time: '13:25', stockAfter: 10 },
  { id: 'm7', productId: '7', productName: 'Café 500 g', type: 'entrada', quantity: 25, date: '15/09/2026', time: '08:50', stockAfter: 40 },
];

// O projeto usa uma navegação simples por estado, sem dependência de biblioteca externa.
type Screen = 'home' | 'products' | 'movements' | 'productForm' | 'productDetails' | 'movementForm';

// Componente principal: mantém produtos/movimentações e controla qual tela está aberta.
export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [movements, setMovements] = useState<Movement[]>(initialMovements);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [storageReady, setStorageReady] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [movementDefaults, setMovementDefaults] = useState<{ productId?: string; type?: 'entrada' | 'saida' }>({});

  useEffect(() => {
    loadInventory()
      .then((saved) => {
        if (saved.products) setProducts(saved.products);
        if (saved.movements) setMovements(saved.movements);
        if (saved.categories) setCategories(saved.categories);
      })
      .catch(() => Alert.alert('Aviso', 'Não foi possível recuperar os dados salvos.'))
      .finally(() => setStorageReady(true));
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    saveInventory({ products, movements, categories }).catch(() =>
      Alert.alert('Erro', 'Não foi possível salvar os dados no dispositivo.')
    );
  }, [products, movements, categories, storageReady]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId]
  );

  const goToProducts = () => setScreen('products');
  const goToMovements = () => setScreen('movements');

  const openNewProduct = () => {
    setEditingProductId(null);
    setScreen('productForm');
  };

  const openEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setScreen('productForm');
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setScreen('productDetails');
  };

  const openMovementForm = (productId?: string, type?: 'entrada' | 'saida') => {
    setMovementDefaults({ productId, type });
    setScreen('movementForm');
  };

  // Insere um produto novo ou atualiza um produto existente.
  const saveProduct = (product: Product) => {
    const categoryName = product.category.trim();
    let category = categories.find((item) => item.name.toLowerCase() === categoryName.toLowerCase());
    if (!category) {
      category = { id: `c-${Date.now()}`, name: categoryName };
      setCategories((current) => [...current, category!]);
    }
    const normalizedProduct = { ...product, category: category.name, categoryId: category.id };
    setProducts((current) => {
      const exists = current.some((item) => item.id === normalizedProduct.id);
      return exists ? current.map((item) => item.id === normalizedProduct.id ? normalizedProduct : item) : [normalizedProduct, ...current];
    });
    setSelectedProductId(normalizedProduct.id);
    setScreen('productDetails');
  };

  // Remove o produto após a confirmação exibida na tela de detalhes.
  // A confirmação usa Modal para funcionar tanto no celular quanto no React Native Web.
  const deleteProduct = (productId: string) => {
    setProducts((current) => current.filter((item) => item.id !== productId));
    setSelectedProductId(undefined);
    setScreen('products');
  };

  // Valida a saída, recalcula o estoque e registra a nova movimentação.
  const saveMovement = (type: 'entrada' | 'saida', productId: string, quantity: number, date: string) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    if (type === 'saida' && quantity > product.quantity) {
      Alert.alert('Estoque insuficiente', 'Não é possível retirar mais do que existe em estoque.');
      return;
    }

    const newStock = type === 'entrada' ? product.quantity + quantity : product.quantity - quantity;
    setProducts((current) => current.map((item) => item.id === productId ? { ...item, quantity: newStock } : item));
    const now = new Date();
    const newMovement: Movement = {
      id: `m-${Date.now()}`,
      productId,
      productName: product.name,
      type,
      quantity,
      date,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      stockAfter: newStock,
    };
    setMovements((current) => [newMovement, ...current]);
    setSelectedProductId(productId);
    setScreen('productDetails');
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#063b7a" />
      {screen === 'home' && (
        <HomeScreen products={products} movements={movements} onProducts={goToProducts} onMovements={goToMovements} onMovement={() => openMovementForm()} onRegister={openNewProduct} onProduct={openProduct} />
      )}
      {screen === 'products' && (
        <ProductsScreen products={products} onBack={() => setScreen('home')} onRegister={openNewProduct} onProduct={openProduct} onMovements={goToMovements} />
      )}
      {screen === 'productForm' && (
        <ProductFormScreen product={editingProductId ? products.find((item) => item.id === editingProductId) ?? null : null} onCancel={() => setScreen(editingProductId ? 'productDetails' : 'products')} onSave={saveProduct} />
      )}
      {screen === 'productDetails' && selectedProduct && (
        <ProductDetailsScreen product={selectedProduct} onBack={goToProducts} onEdit={() => openEditProduct(selectedProduct.id)} onDelete={() => deleteProduct(selectedProduct.id)} onMovement={openMovementForm} />
      )}
      {screen === 'movements' && (
        <MovementsScreen movements={movements} onBack={() => setScreen('home')} onProducts={goToProducts} onRegister={() => openMovementForm()} onProduct={openProduct} />
      )}
      {screen === 'movementForm' && (
        <MovementFormScreen products={products} initialProductId={movementDefaults.productId} initialType={movementDefaults.type} onCancel={() => setScreen('movements')} onSave={saveMovement} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#063b7a' } });
