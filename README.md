# Catálogo de Produto

## Descrição

Aplicação contendo front-end React e back-end .NET Core 3.1 para manutenção do Catálogo de Produtos.

## Como rodar o back-end?

1. Faça o clone do projeto para seu ambiente de trabalho. O codigo-fonte da api se encontra no subdiretório backend.
2. Abra no Visual Studio a solução Product.Catalog.sln
3. Garanta que a solução teve as dependências Nuget restauradas e está compilando com sucesso
4. A solução está configurada para rodar usando IIS Express, Docker ou Docker Compose. Escolha a opção deseja e garanta que a aplicação está rodando.
  a) No caso do IIS Express, a porta configurada é a 44311
  b) No caso do Docker Compose, as portas expostas são 80 (redirecionada na porta localhost 44310) e a porta 443 (redirecionada na porta localhost 44311)
  c) Caso o back-end seja executado usando Docker diretamente, provavelmente a porta utilizada será outra e a mesma deve ser atualizada nas variáveis de ambiente do front-end.
5. O back-end utiliza um banco de dados em memória. Caso seja necessário configurar a utilização de um banco de dados, será necessário configurar essa possibilidade no arquivo Startup.cs comentando a utilização do serviço de banco de dados em memória e descomentado as linhas que registram o serviço do banco de dados real e, após esses passos, configurar a connection string no arquivo appsettings.json.
6. Se a aplicação back-end estiver rodando com sucesso, deve ser possivel acessar o Swagger no endereço .

## Como rodar o front-end?

1. Faça o clone do projeto para seu ambiente de trabalho. O codigo-fonte do front-end se encontra no subdiretório frontend.
2. Instale as dependências usando npm ou yarn
3. Verifique no arquivo .env se o endereço do back-end está configurado corretamente
4. Garanta que a aplicação está executando com sucesso e se comunicando com o back-end executando npm start ou yarn start
5. É possível executar a aplicação usando Docker ou Docker Compose, nesse caso, certifique-se que esteja sendo utilizado o npm. Caso o gerenciado de pacote utilizado seja o yarn, será necessário ajustar o arquivo Dockerfile para copiar o arquivo lock do yarn.
6. Se tudo estiver configurado corretamente, já deve ser possivel utilizar o Catálogo de Produtos e fazer a manutenção dos dados.
