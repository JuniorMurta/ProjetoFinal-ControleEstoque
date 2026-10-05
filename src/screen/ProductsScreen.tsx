import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import TopBar from '../components/TopBar';
import { COLORS, ui } from '../styles/InventoryStyles';
import { Product } from '../types';

type Props = { products: Product[]; onBack: () => void; onRegister: () => void; onProduct: (id: string) => void; onMovements: () => void };
// Lista de produtos com busca, filtro de estoque baixo e filtro de categoria.
export default function ProductsScreen({ products, onBack, onRegister, onProduct, onMovements }: Props) {
  const [search, setSearch] = useState('');
  const [lowOnly, setLowOnly] = useState(false);
  const [category, setCategory] = useState('Todas');
  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];
    // A lista é recalculada sempre que o usuário altera busca ou filtros.
  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (!lowOnly || p.quantity <= p.minQuantity) && (category === 'Todas' || p.category === category)), [products, search, lowOnly, category]);
  return <View style={ui.page}><TopBar title="Produtos" subtitle={`${products.length} produtos cadastrados`} icon="▦" onBack={onBack} right={<TouchableOpacity onPress={onRegister} style={{ borderWidth: 1, borderColor: '#c9ddf5', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row' }}><Text style={{ color: COLORS.white, fontSize: 23 }}>＋</Text><Text style={{ color: COLORS.white, fontWeight: '800', marginLeft: 5 }}>Cadastrar</Text></TouchableOpacity>} />
    <ScrollView contentContainerStyle={ui.scroll}>
      <View style={[ui.input, { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }]}><Text style={{ fontSize: 25, color: COLORS.muted, marginRight: 10 }}>⌕</Text><TextInput value={search} onChangeText={setSearch} placeholder="Pesquisar produto..." placeholderTextColor={COLORS.muted} style={{ flex: 1, color: COLORS.text, fontSize: 16 }} /></View>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}><Filter active={!lowOnly} label={`Todos (${products.length})`} onPress={() => setLowOnly(false)} /><Filter active={lowOnly} label={`Estoque baixo (${products.filter(p => p.quantity <= p.minQuantity).length})`} onPress={() => setLowOnly(true)} /><TouchableOpacity onPress={() => setCategory(categories[(categories.indexOf(category) + 1) % categories.length])} style={{ borderWidth: 1, borderColor: '#aabed8', borderRadius: 13, paddingHorizontal: 14, justifyContent: 'center', minWidth: 125 }}><Text style={{ color: COLORS.text, fontWeight: '700' }}>{category}⌄</Text></TouchableOpacity></View>
      {filtered.map(product => <TouchableOpacity key={product.id} onPress={() => onProduct(product.id)} style={ui.card}><View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={{ width: 72, height: 82, borderRadius: 12, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginRight: 14 }}><Text style={{ fontSize: 42 }}>{product.icon}</Text></View><View style={{ flex: 1 }}><Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }}>{product.name}</Text><Text style={{ color: COLORS.muted, marginTop: 6 }}>Categoria: {product.category}</Text><Text style={{ color: COLORS.muted, marginTop: 5 }}>Preço: R$ {product.price.toFixed(2).replace('.', ',')}</Text></View><View style={{ alignItems: 'flex-end' }}><Text style={{ backgroundColor: product.quantity <= product.minQuantity ? COLORS.redBg : COLORS.greenBg, color: product.quantity <= product.minQuantity ? COLORS.red : COLORS.green, fontSize: 16, fontWeight: '800', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 9 }}>{product.quantity} un.</Text>{product.quantity <= product.minQuantity && <Text style={{ backgroundColor: COLORS.yellowBg, color: '#8a5a00', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8, marginTop: 6, fontSize: 12 }}>⚠ Estoque baixo</Text>}</View><Text style={{ color: COLORS.muted, fontSize: 28, marginLeft: 10 }}>›</Text></View></TouchableOpacity>)}
      {!filtered.length && <View style={{ alignItems: 'center', padding: 40 }}><Text style={{ color: COLORS.muted, fontSize: 18 }}>Nenhum produto encontrado.</Text></View>}
    </ScrollView><BottomNav active="products" onHome={onBack} onProducts={() => {}} onMovements={onMovements} />
  </View>;
}
function Filter({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) { return <TouchableOpacity onPress={onPress} style={{ flex: 1, minHeight: 48, borderRadius: 13, backgroundColor: active ? COLORS.blue : 'transparent', borderWidth: active ? 0 : 1, borderColor: '#aabed8', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}><Text style={{ color: active ? COLORS.white : COLORS.text, fontWeight: '700', textAlign: 'center' }}>{label}</Text></TouchableOpacity>; }
