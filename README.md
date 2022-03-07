# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de algum carro já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsavel pelo cadastro deve ser um administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carror disponíveis.
Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
Deve ser possível listar todos os carros disponiveis pelo nome da marca.
Deve ser possível listar todos os carros disponiveis pelo nome do carro

**RN**
O usúario não precissa estar logado no sistema.

# Cadastro de Especificações no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagen do carro.
Deve ser possível listar todos os carros.

**RNF**
Ultilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
