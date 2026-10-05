# Projeto Final — Sistema de Controle de Estoque

Aplicativo desenvolvido por **José Ricardo e Marcos** para o Projeto Final de Desenvolvimento de Sistemas para Dispositivos Móveis.

## Objetivo

Auxiliar pequenos comerciantes no controle de produtos, quantidades, entradas e saídas de estoque, reduzindo erros de controle manual e facilitando a identificação de itens com estoque baixo.

## Funcionalidades

- Dashboard com total de produtos, estoque baixo e movimentações dos últimos 30 dias.
- Cadastro, edição, exclusão, pesquisa e listagem de produtos.
- Validação dos campos obrigatórios, preços positivos e quantidades válidas.
- Registro de entradas e saídas, impedindo saída maior que o estoque disponível.
- Histórico de movimentações com pesquisa e filtros.
- Persistência local com **AsyncStorage**, mantendo os dados após fechar e abrir o aplicativo.
- Navegação entre 6 telas funcionais.

## Entidades de dados

O aplicativo trabalha com três entidades relacionadas:

- **Categoria**: `id` (PK) e `name`.
- **Produto**: `id` (PK), dados do produto e `categoryId` (FK).
- **Movimentação**: `id` (PK), `productId` (FK), tipo, quantidade, data, hora e estoque após a operação.

Relacionamentos:

- Categoria 1:N Produto.
- Produto 1:N Movimentação.

## Estrutura principal

```text
src/
├── components/   # componentes reutilizáveis
├── screen/       # telas do aplicativo
├── storage/      # persistência local com AsyncStorage
├── styles/       # estilos compartilhados
└── types.ts      # entidades e tipos
```

Componentes reutilizáveis incluem `TopBar`, `BottomNav` e os componentes de entrada personalizados.

## Tecnologias

- React Native
- Expo
- TypeScript
- AsyncStorage
- StyleSheet / Flexbox

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npx expo start --tunnel
```

Também é possível executar no navegador com:

```bash
npx expo start --web
```

> O pacote `@react-native-async-storage/async-storage` está declarado nas dependências e será instalado pelo `npm install`.
