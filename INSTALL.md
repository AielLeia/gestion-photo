# Prérequis

Afin de démarrer le site, vous devez avoir:
- node disponible sur [nodejs.org](https://nodejs.org/en/download/)
- npm (node package management) qui est le gestionnaire de packer disponible aussi sur [nodejs.org](https://nodejs.org/en/download/)

Enfin télécharge la dernière version du serveur [apache jena](https://jena.apache.org/download/index.cgi), le plus important c'est de lance avec une double clique l'exécutable afin de démarré le serveur.

# Installation

## Installation des dépendances

Une fois les prérequis mise en place, nous allons procéder à l'installation des différents dépendances de l'application.
Pour installer ces dépendances il faudra taper la commande:
```bash
npm run app:install
```
Cette commande permettra d'installer tous les librairies nécessaires au fonctionnement du site.

## Replissage de la base de données

Une fois les dépendances nécessaire au fonctionnement de l'application sont installées, nous allons nous tourner sur le remplissage de la base de données:
```bash
npm run app:db:fill
```

ATTENTION: il est important de noté que le serveur d'apache Jena doit être disponible en locale sur le port 3030, et doit être accessible sur le lien: http://localhost:3030 

# Lancement de l'application

Dans cette étape nous allons lancer l'application avec:
```bash
npm run app:start
```
L'application seras disponible sur: [http://locahost:3000/](http://locahost:3000/)