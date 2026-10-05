import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ui } from '../styles/InventoryStyles';

type Props = { active: 'home' | 'products' | 'movements'; onHome: () => void; onProducts: () => void; onMovements: () => void };

// Barra inferior reutilizada nas três telas principais.
export default function BottomNav({ active, onHome, onProducts, onMovements }: Props) {
  const item = (key: Props['active'], icon: string, label: string, action: () => void) => (
    <TouchableOpacity accessibilityRole="button" onPress={action} style={[ui.navItem, active === key && ui.navItemActive]}>
      <Text style={[ui.navIcon, active === key && ui.navIconActive]}>{icon}</Text>
      <Text style={[ui.navText, active === key && ui.navTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
  return <View style={ui.bottomNav}>{item('home', '⌂', 'Início', onHome)}{item('products', '▦', 'Produtos', onProducts)}{item('movements', '⇄', 'Movimentações', onMovements)}</View>;
}
