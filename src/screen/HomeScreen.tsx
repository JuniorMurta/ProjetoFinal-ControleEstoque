import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import TopBar from '../components/TopBar';
import { COLORS, ui } from '../styles/InventoryStyles';
import { Movement, Product } from '../types';

type Props = { products: Product[]; movements: Movement[]; onProducts: () => void; onMovements: () => void; onMovement: () => void; onRegister: () => void; onProduct: (id: string) => void };
// Dashboard com indicadores, produtos em estoque baixo e atalhos de ação.
export default function HomeScreen({ products, movements, onProducts, onMovements, onMovement, onRegister, onProduct }: Props) {
    // O alerta de estoque baixo é calculado diretamente pela quantidade mínima do produto.
  const low = products.filter(p => p.quantity <= p.minQuantity);
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const recent = movements.filter(m => { const [d, mo, y] = m.date.split('/').map(Number); const dt = new Date(y, mo - 1, d); return !Number.isNaN(dt.getTime()) && dt >= cutoff; });
  const entradas = recent.filter(m => m.type === 'entrada').length;
  const saidas = recent.filter(m => m.type === 'saida').length;
  return <View style={ui.page}>
    <TopBar title="Controle de Estoque" subtitle="Seu estoque, sempre em dia!" icon="▦" right={<TouchableOpacity onPress={() => Alert.alert('Notificações', low.length ? `Você possui ${low.length} produto(s) com estoque baixo.` : 'Nenhuma nova notificação.')}><Text style={{ color: COLORS.white, fontSize: 28 }}>♧</Text></TouchableOpacity>} />
    <ScrollView contentContainerStyle={ui.scroll}>
      <Text style={{ color: COLORS.white, fontSize: 34, fontWeight: '800', marginTop: 6 }}>Olá!</Text>
      <Text style={{ color: '#dbeaff', fontSize: 17, marginBottom: 16 }}>Aqui está um resumo do seu estoque.</Text>
      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
        <Metric icon="▦" label="Total de Produtos" value={products.length} color={COLORS.blue} />
        <Metric icon="!" label="Produtos com Estoque Baixo" value={low.length} color={COLORS.yellow} />
        <Metric icon="↑" label="Entradas" detail="últimos 30 dias" value={entradas} color={COLORS.green} />
        <Metric icon="↓" label="Saídas" detail="últimos 30 dias" value={saidas} color={COLORS.red} />
      </View>
      <View style={{ ...ui.card, marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}><Text style={{ fontSize: 26, color: COLORS.yellow, marginRight: 10 }}>!</Text><Text style={ui.sectionTitle}>Produtos em Estoque Baixo</Text><TouchableOpacity onPress={onProducts} style={{ marginLeft: 'auto' }}><Text style={{ color: COLORS.navy2, fontWeight: '700' }}>Ver todos ›</Text></TouchableOpacity></View>
        {low.map(product => <TouchableOpacity key={product.id} onPress={() => onProduct(product.id)} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.line, paddingVertical: 13 }}><Text style={{ fontSize: 25, width: 42, textAlign: 'center' }}>{product.icon}</Text><Text style={{ flex: 1, color: COLORS.text, fontSize: 16 }}>{product.name}</Text><Text style={{ color: COLORS.red, fontSize: 16, fontWeight: '800', marginRight: 10 }}>{product.quantity} un.</Text><Text style={{ color: COLORS.muted, fontSize: 22 }}>›</Text></TouchableOpacity>)}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}><TouchableOpacity onPress={onRegister} style={[ui.primaryButton, { flex: 1 }]}><Text style={{ color: COLORS.white, fontSize: 27, marginRight: 8 }}>＋</Text><Text style={ui.primaryText}>Cadastrar Produto</Text></TouchableOpacity><TouchableOpacity onPress={onMovement} style={[ui.secondaryButton, { flex: 1 }]}><Text style={{ color: COLORS.navy2, fontSize: 25, marginRight: 8 }}>⇄</Text><Text style={ui.secondaryText}>Registrar Movimentação</Text></TouchableOpacity></View>
      </View>
    </ScrollView>
    <BottomNav active="home" onHome={() => {}} onProducts={onProducts} onMovements={onMovements} />
  </View>;
}

function Metric({ icon, label, detail, value, color }: { icon: string; label: string; detail?: string; value: number; color: string }) {
  return <View style={{ flexGrow: 1, flexBasis: '45%', backgroundColor: COLORS.white, borderRadius: 18, padding: 16, minHeight: 120, flexDirection: 'row', alignItems: 'center' }}><View style={{ width: 58, height: 58, borderRadius: 30, backgroundColor: color, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}><Text style={{ color: COLORS.white, fontSize: 31, fontWeight: '700' }}>{icon}</Text></View><View style={{ flex: 1 }}><Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{label}</Text>{detail && <Text style={{ color: COLORS.muted, fontSize: 13 }}>({detail})</Text>}<Text style={{ color: color === COLORS.yellow ? '#b66b00' : color, fontSize: 38, fontWeight: '800', marginTop: 2 }}>{value}</Text></View></View>;
}
