# 1°) Contexte

Une photo prise avec ses amis ou en famille peut parfois être amène à être perdue ou que l'appareil ne fonctionne plus ou qu'une raison étrangère mène la perte de cette photo. Nous voulons concevoir et mettre en place un système permettant la gestion de ces photos publiques que privé et d'en laisse une trace. L’application sera accessible via un navigateur Web de façon à ne pas être dépendante du support matériel : ordinateur, tablette,
smartphone. Une photo peut être prise dans un lieu public avec des proches ou des amis à une date donnée.

L'application disposera d'une section grand public et les visiteurs pourront avoir accès aux dernières photos publiées ainsi qu'une brève description de celle-ci, les photos seront regroupées par catégorie et chaque visiteur pourra y applique un certain nombre de filtres pour affiner ses recherches (par exemple: lieux, la date, la source de la photo, etc...).

Lorsqu'un visiteur clique sur une photo, son auteur ainsi que sa description seront affichées, il se peut qu'une photo n'est pas description particulière, sur la même page, les différentes photos postées par cet utilisateur seront affichées et seront aussi filtrables par les différents filtres décrit au-dessus. Un visiteur auras le droit de laisse un commentaire sur une photo.

Un visiteur auras le droit de s'inscrire et ainsi devenir un utilisateur et pourra avec ce status posté et publié les photos qu'il souhaite. Un utilisateur auras aussi le droit de masque une photo ou de la rendre publique ainsi pouvoir accéder à différentes statistiques sur sa photo (le nombre de vue, le nombre de like ou le nombre de dislike, etc .). Un utilisateur pourra accéder à des statistiques liées à ces photos (la photo la plus vue, la photo la plus like ou la photo la plus disliker). Un utilisateur pourra stocker ses photos dans des dossiers virtuels afin de les catégorise et ainsi pourvoir mieux s'y retrouver. Enfin un utilisateur auras à tout moment accès aux données de ses photos est par ce fait supprimer une photo ou en modifier different caractéristique.

# 2°) Objectif de la solution

## 2.1°) Pour les utilisateurs

Ce logiciel permet à un utilisateur de se connecter avec un pseudo et un mot de passe (éventuellement génère) et ainsi pouvoir avoir accès à ses photos, il pourra modifier les caractéristiques d'une photo, uploader une photo et supprime une photo. Les statistiques liées à ses photos lui seront disponibles. Un utilisateur peut supprimer les commentaires sur une photos qu'il trouve génant.

## 2.2°) Pour les visiteurs

Ce logiciel permet à un visiteur d'avoir accès à la page d'accueil et ainsi visualiser les dernières photos postées par les utilisateurs et peut éventuellement laisse un commentaire sur une photo ou signalé une photo.

# 3°) Administrateurs et utilisateurs

## 3.1°) Administrateurs

Pour pouvoir gérer les données de l’application, les responsables de la structure doivent être identifiés. Il doit au moins avoir un administrateur de l'application. Un administrateur pourra effectuer certaines actions liées aux utilisateurs et à leurs photos ainsi un administrateur pourra supprime une photo et recevoir des alertes liées à une photo, il aura aussi accès aux statistiques d'un utilisateur et effectuée des recherches sur celui-ci. Un administrateur pourra créer d'autres administrateurs et leur attribue des droits.

## 3.2°) Utilisateurs

Dans cette application, coté utilisateur nous avons deux types d'utilisateurs, celles qui viennent sur le site et que nous appelerons par la suite **les visiteurs**, et celles qui se connecter et publie des photos que nous appelerons **les utilistateurs**.

### 3.2.1°) Les visiteurs

Les visiteurs ne disposent pas de compte. Ils se contentent de visualiser les données (photos) publiées sur les pages web de l'application. Ils peuvent aussi éventuellement s'inscrire sur le site pour avoir le status d'utilisateur et ainsi posté des photos.

### 3.2.2°) Les utilisateurs

Les utilisateurs peuvent se connecte pour publiée des **photos**. Après téléversement de la photo et l'ajout des caracteristiques complaimentaires à la photos (description, categorie, titre, ...), on leur fourni des statistiques rélative à la photo qui vient d'être posté.

# 4°) Périmètre du système

Le logociel permet simplement de faire la gestion des photos et pas le traitement d'image. Des photos choquante ou qui purront atteindre la sensibilité des gens ou si des photos on été signaler et que l'administrateur juge que ces une photo choquante alors elle seras supprimer.

# 5°) Règles métier

Les visiteurs peuvent accèdent au site sans se connecter et pourront par la suite s'inscrire et ainsi deviendront des utilisateurs avec des identifiants.

Un inscription au niveau du site est obligatoire pour pouvoir téléverse les photos. 

A chaque nouvelle photo est associés une categorie choisie par l'utilisateur, un titre et un bref description (la description étant optionnel)

Une liste de catégories est propre a chaque utilisateur et pourras ensuite ranger les photos dans les categories propre a celui-ci.

Un identifiant (Obligatoire lors de l'inscription) et un mot de passe (éventuellement génére ou choisi par l'utilisateur) seront nécessaire pour accéder a son espace privée.

Des photos choquante ou pouvant atteindre la sensiblité des gens seront supprimer et au bout de trois photos supprimer le compte est bloque ou est banni definitivement.

# 6°) Cas d'utilisation 

## 6.1°) Administrateurs

L'aministrateur pourras accèder au données des utilisateurs et aussi a leurs statistiques, il pourras supprimer un photo, en modifer les caractéristiques. L'administrateur pour supprimer ou bloque un compte utilisateur, il pourras aussi effectuer des recherches sur un utilisateur donner. Un administrateur pour aussi crée d'autre compte administrateur, les supprimers, en modifiers certaines carateristiques telle que le mot de passe ou le pseudo.

## 6.2°) Connexion d'un utlisateur ou d'un administrateur

Un utilisateur ou un administrateur pourront se connecter avec des identifiants, c'esr à dire un login et un mot de passe.

## 6.3°) Ajout d'une photo, d'une categorie.

L'ajout d'une photo, d'une categorie se feras par l'intermedaire d'un compte utilisateur ayant les identifiants login et mot de passe. Un Catégorie est au moins associer a une photo.

## 6.4°) Modifcation d'une photo, d'une categorie

Un administrateur ou un utilisateur qui a les droits sur ces photos pourront modifier les caractéristique liée a une photo ou bien même modifier le titre d'une categorie.

## 6.5°) Suppression d'un photo, d'un catégorie.

Un utilisateur peut supprimer une photo, et aussi auras le choix de supprimer toute une catégorie de photo, dans ce cas il faudrait supprimer toute les photos liée a cette catégorie.

## 6.6°) Accès au statistique d'une photo

Un utilisateur ou un administrateur auras accès au statistique d'une photo, le nombre de like, de dislike, le nombre de vue et aurons aussi accès a un graphe permettant de faire des liaison entre les photos d'un utilisateur.

# 7°) Contraite technique

Le développement se fera en HTML, CSS, JavaScript, TypeScript et en utilisant le framework ReactJS et l'outil webpack afin de modularise le code javaScript. Côté présentation des composants, un template Bootstrap sera choisi. Les données seront stockées dans une base de données triplestores avec apuis sur l'API Jena TDB et Fuseki.

Utiliser des graphes pour les utilisateurs