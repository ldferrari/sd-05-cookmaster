// colocar query do MongoDB
// 6 - Permissões do usuário admin
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
