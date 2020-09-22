# Vaga Backend Developer JR - [AIRFLUENCERS](https://airfluencers.com)

# TECNOLOGIAS UTILIZADAS

Back-End: Node, typeScript, knex, mysql e Insomnia para testar as requisições HTTP

# INICIANDO O BACK-END

1º Instalar as dependências do projeto com o comando: npm install

2º nos arquivos Knexfile.ts e database/connection.ts alterar as variaveis de conexão com o banco de dados mysql para as variavies da sua conexão

3º Crie um banco de dados com o nome campeonato

4º Digite o comando: npm run knex:migrate para criar as tabelas no banco

5º Digite o comando: npm run knex:seed para inserir dados no banco. OBS: Caso queira cadastrar os jogos automaticamente é necessário mover o arquivo extras/create_match.ts para a pasta seeds e atualizar o score de cada time de acordo com os placares das partidas digitadas

6º Para executar o back-end da aplicação execute o comando: npm run dev
