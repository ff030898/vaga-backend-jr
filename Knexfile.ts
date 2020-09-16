import path from 'path'; //Para lidar com caminhos dentro do Node padroniza o caminho com a barra invertida ou não dependendo do SO

module.exports = {
    client: 'mysql',
    connection: {
        user : 'root',
        password : '',
        database : 'campeonato'
      },
    
 migrations: {
     directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
 },

 seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
},

 useNullAsDefault: true,
};