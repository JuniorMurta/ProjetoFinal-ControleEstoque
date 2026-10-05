import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { COLORS, ui } from '../styles/InventoryStyles';
import { Product } from '../types';

type Props = { product: Product | null; onCancel: () => void; onSave: (product: Product) => void };

export default function ProductFormScreen({ product, onCancel, onSave }: Props) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [price, setPrice] = useState(product ? String(product.price).replace('.', ',') : '');
  const [quantity, setQuantity] = useState(product ? String(product.quantity) : '');
  const [touched, setTouched] = useState({ name: false, description: false, category: false, price: false, quantity: false });

  const touch = (field: keyof typeof touched) => setTouched(current => ({ ...current, [field]: true }));
  const touchAll = () => setTouched({ name: true, description: true, category: true, price: true, quantity: true });

  const priceNumber = Number(price.replace(',', '.'));
  const quantityNumber = Number(quantity);
  const errors = useMemo(() => ({
    name: !name.trim() ? 'O nome é obrigatório.' : '',
    description: !description.trim() ? 'A descrição é obrigatória.' : description.length > 200 ? 'A descrição deve ter no máximo 200 caracteres.' : '',
    category: !category.trim() ? 'A categoria é obrigatória.' : '',
    price: !price.trim() ? 'O preço é obrigatório.' : Number.isNaN(priceNumber) || priceNumber <= 0 ? 'Informe um preço maior que zero.' : '',
    quantity: !quantity.trim() ? 'A quantidade é obrigatória.' : !Number.isInteger(quantityNumber) || quantityNumber < 0 ? 'Informe uma quantidade inteira igual ou maior que zero.' : '',
  }), [name, description, category, price, quantity, priceNumber, quantityNumber]);
  const valid = !Object.values(errors).some(Boolean);

  const submit = () => {
    touchAll();
    if (!valid) return;
    onSave({
      id: product?.id ?? `p-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      categoryId: product?.categoryId ?? '',
      category: category.trim(),
      price: priceNumber,
      quantity: quantityNumber,
      minQuantity: product?.minQuantity ?? 5,
      icon: product?.icon ?? '📦',
    });
  };

  const inputStyle = (field: keyof typeof touched, error: string) => [ui.input, touched[field] && error ? { borderColor: COLORS.red, borderWidth: 2 } : null];
  const ErrorText = ({ field, error }: { field: keyof typeof touched; error: string }) => touched[field] && error ? <Text style={{ color: COLORS.red, marginTop: 5 }}>{error}</Text> : null;

  return <View style={ui.page}>
    <TopBar title={product ? 'Editar Produto' : 'Cadastrar Produto'} subtitle="Preencha os dados do produto." icon="▦" onBack={onCancel} />
    <ScrollView contentContainerStyle={ui.scroll} keyboardShouldPersistTaps="handled">
      <View style={ui.card}>
        <Field label="Nome do Produto *"><TextInput value={name} onChangeText={setName} placeholder="Digite o nome do produto" placeholderTextColor={COLORS.muted} onBlur={() => touch('name')} style={inputStyle('name', errors.name)} /><ErrorText field="name" error={errors.name} /></Field>
        <Field label="Descrição *"><TextInput value={description} onChangeText={text => setDescription(text.slice(0, 200))} multiline numberOfLines={4} placeholder="Digite uma breve descrição do produto" placeholderTextColor={COLORS.muted} onBlur={() => touch('description')} style={[...inputStyle('description', errors.description), { minHeight: 110, paddingTop: 14, textAlignVertical: 'top' }]} /><Text style={{ color: COLORS.muted, textAlign: 'right', marginTop: 4 }}>{description.length}/200</Text><ErrorText field="description" error={errors.description} /></Field>
        <Field label="Categoria *"><TextInput value={category} onChangeText={setCategory} placeholder="Ex.: Alimentos" placeholderTextColor={COLORS.muted} onBlur={() => touch('category')} style={inputStyle('category', errors.category)} /><ErrorText field="category" error={errors.category} /></Field>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}><Field label="Preço (R$) *"><TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="0,00" placeholderTextColor={COLORS.muted} onBlur={() => touch('price')} style={inputStyle('price', errors.price)} /><ErrorText field="price" error={errors.price} /></Field></View>
          <View style={{ flex: 1 }}><Field label="Quantidade Inicial *"><TextInput value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="0" placeholderTextColor={COLORS.muted} onBlur={() => touch('quantity')} style={inputStyle('quantity', errors.quantity)} /><ErrorText field="quantity" error={errors.quantity} /></Field></View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
          <TouchableOpacity onPress={onCancel} style={[ui.secondaryButton, { flex: 1 }]}><Text style={ui.secondaryText}>×  Cancelar</Text></TouchableOpacity>
          <TouchableOpacity onPress={submit} disabled={!valid} style={[ui.primaryButton, { flex: 1 }, !valid && { opacity: 0.45 }]}><Text style={ui.primaryText}>{product ? 'Salvar Alterações' : 'Cadastrar Produto'}</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <View style={{ marginBottom: 18 }}><Text style={ui.label}>{label}</Text>{children}</View>;
}
