# MaPUI Exercice Starter

Pour te faire gagner du temps, on a généré :
- une application Angular dans le dossier [client](client/README.md)
- un serveur NestJS dans le dossier [server](server/README.md)

Il faut utiliser nodejs 16 et npm 8, pour ça tu dois installer [nvm](https://github.com/nvm-sh/nvm) puis faire `nvm use` dans le terminal.

Pour lancer une base de données MongoDB, on te recommande Docker :
```console
$ docker run --rm -it -p 27017:27017 mongo
```

En bonus si tu as le temps, tu peux rajouter un docker-compose.yml pour lancer le client, le serveur et la base de données.

## Structure du projet

```console
.
├── client             - Webapp Angular
├── server             - Serveur NestJS
├── .eslintrc.json     - Config ESLint
├── .prettierrc        - Config Prettier utilisée comme plugin eslint
├── docker-compose.yml - En bonus ?
└── package.json       - Dépendances npm à la racine pour eslint
```
