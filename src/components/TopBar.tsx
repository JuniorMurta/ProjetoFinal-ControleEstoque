import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ui } from '../styles/InventoryStyles';

type Props = { title: string; subtitle?: string; icon?: string; onBack?: () => void; right?: React.ReactNode };
// Cabeçalho padrão para manter a identidade visual em todas as telas.
export default function TopBar({ title, subtitle, icon = '▦', onBack, right }: Props) {
  return <View style={ui.topBar}>
    <View style={ui.topLeft}>
      {onBack && <TouchableOpacity onPress={onBack} style={ui.backButton}><Text style={ui.backText}>‹</Text></TouchableOpacity>}
      <Text style={ui.topIcon}>{icon}</Text>
      <View style={{ flex: 1 }}><Text style={ui.topTitle}>{title}</Text>{subtitle && <Text style={ui.topSubtitle}>{subtitle}</Text>}</View>
    </View>
    {right}
  </View>;
}
