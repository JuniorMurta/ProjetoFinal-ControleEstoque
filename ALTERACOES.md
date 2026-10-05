# Alterações para adequação ao roteiro do Projeto Final

- Implementado armazenamento local com AsyncStorage para produtos, categorias e movimentações.
- Criada entidade Categoria e relacionamento Categoria 1:N Produto por `categoryId`.
- Mantido relacionamento Produto 1:N Movimentação por `productId`.
- Cadastro de produto passou a exigir nome, descrição, categoria, preço e quantidade válidos.
- Preço deve ser maior que zero e quantidade deve ser inteira e não negativa.
- Mensagens de validação são exibidas junto aos campos e o botão fica desabilitado enquanto o formulário estiver inválido.
- Removido seletor de imagem do cadastro de produto, conforme planejamento do projeto.
- Registro de movimentação exige quantidade inteira maior que zero e bloqueia saída acima do estoque.
- Data de nova movimentação passa a iniciar com a data atual do dispositivo.
- Indicadores de entradas e saídas do Dashboard agora consideram efetivamente os últimos 30 dias.
- README atualizado com objetivo, funcionalidades, entidades, estrutura, tecnologias e instruções de execução.

- Ajustados os ícones de produto/estoque que apareciam como quadrados vazios no Expo Web.
