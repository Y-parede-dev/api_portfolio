# API pour porte folio

></br>***DOCUMENTATION API POUR PORTE FOLIO***
</br></br>
>Cette API a pour but de vous aider a crée votre propre porte-folio, elle est fournie avec une base de données mySql.
</br>
Si vous rencontrez le moindre problème :</br>&nbsp;&nbsp;- je vous invite à taper votre problème dans la section pull request n'hésiter pas à y introduire des screens shoot de votre souci ainsi que les appels API que vous tentez de faire.
</br></br>

</br>

## SOMMAIRE

* [Instalation de la BDD](#1-instalation--de-la-bdd)</br>
  * [Avec phpMyAdmin](#avec-phpmyadmin)</br>
  * [En ligne de commande](#en-ligne-de-commande)</br>
* [Clonage du repository](#2-clonage-du-repository)</br>
  * [HTTPS](#https)</br>
  * [SSH](#ssh)</br>
* [Instalation des dépendences](#3-instalation-des-dépendances)</br>
* [Paramétrage fichier .env](#4-parametrage-fichier-env)</br>
* [Utiliser l'API](#5-utilser-lapi)</br>

## 1. ` Instalation  de la BDD `

</br>

### Avec phpMyAdmin

</br>
Tout dabord commencer par ouvrir votre phpmyadmin, si vous ne l'avez pas installer je vous invite à télecharger l'un des programes suivant </br></br>

></br> :thought_balloon: </br></br> si vous etes sous windows :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[wamp](https://www.wampserver.com/)</br></br>
>si vous etes sous mac (fonctione aussi sous windows) :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[mamp](https://www.mamp.info/en/downloads/)</br></br>
>si vous etes sous linux :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[lamp](https://www.tech2tech.fr/installation-de-lamp-sur-ubuntu-20-04/)</br></br>

### je vous invite a télécharger la base de donnée préalablement crée pour vous en cliquant sur le lien suivant :</br>

[download DATABASE](./assets/fichier_doc/Database_pf.zip)</br>

### une fois fait ouvrez votre phpMyAdmin

></br> :thought_balloon: conseil utile :</br></br>ne rester pas sur l'utilisateur de base qui doit etre : Root </br>crée plutot un utilisateur avec les privileges directement sur phpMyAdmin vous trouverais un tuto ici (prochainement) une fois fait deconecter vous de ROOT et passer sur votre profil</br></br>

sur phpMyAdmin dans la barre de navigation en haut cliquer sur importer base de données (img.1)</br></br>
![img_choise_file](https://github.com/Y-parede-dev/porte-folio-v1.0-backend/blob/master/assets/images/doc/doc_start.PNG?raw=true)</br></br>
cliquez ensuite sur choisir un fichier charger le fichier que vous avez décompresser plus tot</br></br>
![img_imp_file](https://github.com/Y-parede-dev/porte-folio-v1.0-backend/blob/master/assets/images/doc/doc_import_2.png?raw=true)</br></br>
cliquez sur ``` Exécuter ``` a droite de la page</br></br>
![img_imp_file](https://github.com/Y-parede-dev/porte-folio-v1.0-backend/blob/master/assets/images/doc/doc_import_3.png?raw=true)</br></br>
Vous voila avec la base de donnée crée vous devriez avoir une page comme cet image</br></br>
![img_good_file](https://github.com/Y-parede-dev/porte-folio-v1.0-backend/blob/master/assets/images/doc/doc_good_phase.PNG?raw=true)</br></br>
vous pouvez observer 2 tables ` users ` & ` projects `

### En ligne de commande

    A VENIR

## 2. ` Clonage du repository `

## HTTPS

>> placer vous dans votre environement de travail avec soit le terminal de vsCode ou directement en executan voutre cmd.exe en administrateur</br>
puis tapez la commande : ` git clone https://github.com/Y-parede-dev/porte-folio-v1.0-backend.git`
</br>
</br>

</br>

## SSH

>> placer vous dans votre environement de travail avec soit le terminal de vsCode ou directement en executan voutre cmd.exe en administrateur</br>
puis tapez la commande : ` git clone git@github.com:Y-parede-dev/porte-folio-v1.0-backend.git`</br>
>>> :thought_balloon: pour utiliser le ssh vous devez avoir au préalable une clé ssh connecter a votre compte github</br>
Vous trouverez prochainement ici comment générer une clé ssh et la charger sur github</br>
</br>

## 3. ` Instalation des dépendances `

vous avez besoin de node.js et de npm sur votre machine</br>
dans l'inviter de commande placer vous sur votre repertoire que vous venez de clonez ` cd ./porte-folio-v1.0-backend `</br>
puis tapez ` npm init ` puis ` npm init `</br>
</br>
les dépendences télécharger nous pouvons passez a la suite
</br>

## 4. ` Parametrage fichier .env `

</br> Repéré le fichier nomé ` .exemple.env ` renomé le en ` .env `</br>
ouvrer le avec votre éditeur de code favori pour ma part c'est ` vsCode ` une fois dedans remplisser les informations nécessaire puis enregistrer ` ctrl+s ` dans ` vsCode `</br>
a se stade si dans votre cmd vous tapez la commande ` npm run dev ` (ou ` yarn dev ` si yarn est installer sur votre machine)</br>
vous devriez avoir un message comme çi-dessous:</br></br>
![img_good_file](https://github.com/Y-parede-dev/porte-folio-v1.0-backend/blob/master/assets/images/doc/connexion_good.PNG?raw=true)</br>
Félicitation vôtre API est préte a etre utiliser</br>

si vous souhaitez passer l'API en mode prod fermer le terminal et re-ouvrez le ( noubliez pas de vous replacer dans votre dossier ` porte-folio-v1.0-backend ` )</br>
tapez ` npm run prod ` l'API tourne sous forever du coup si une requete plante le serveur se relancera de lui même

## 5. ` Utilser l'api `

ROUTES USERS
</br>

|   VERB HTTP    |       point d'accés       |   corp requette    |   type de </br>reponse attendu    |   fonction     |
|   ---     |           :-:             |   ---            |   :-:                        |   :-:     |
|   **POST**    |   /api/profil/sigup       |   { </br>```"nom":"string",``` </br> ```"prenom":"string",``` </br> ```"mail":"email",``` </br> ```"pass":"string",``` </br> ```"age":number```</br>}    |   status(200) : creation de l'utilisateur dans la bdd </br>si probleme</br>status(404): le probleme sera marque dans la reponse HTTP       |   Création d'un utlisateur avec :</br>- mot de passe sécurise et haché </br> - email valide(votre@mail.ext)      |
|   **POST**    |   /api/profil/login    |   { </br> ```"mail":"email",``` </br> ```"pass":"string",```</br>}    |status(200): retourne un jeton token</br>status(400):  retourne une erreur mail ou mot de pass|   se connecte a un profil utilisateur     |
|   **GET**    |   /api/profil    |   Aucun body n'est requis    |   status(200): retourne tous les profils</br> status(404): retourne un message expliquant</br> qu'il n'y a pas d'utilisateur enregistrer     |   retourne les utilisateurs enregistrer sur la BDD    |
|   **GET**    |   /api/profil/:id    |   Aucun body n'est requis    |   status(200): retourne le profil ciblé</br> status(404): retourne un message expliquant </br>qu'il n'y a pas d'utilisateur enregistrer avec cet id    |   retourne l'utilisateur ciblé     |
|   **PUT**    |   /api/profil/:id    |   { </br>```"nom":"string",``` </br> ```"prenom":"string",``` </br> ```"mail":"email",``` </br> ```"pass":"string",``` </br> ```"age":number```,</br>```"img_url":string```</br>}    |    status(200): modifie les informations de l'utilisateur</br> status(400):retourne un message d'ereur    |   permet de modifier son profil,</br> ne pas oublier le token  dans le header de la requete    |
|   **DELETE**    |    /api/profil/:id   |   Aucun body n'est requis mais ne pas oublier </br> le token dans le header   |  status(200): message indiquant que la req c'est bien passer</br>status(400): un message expliquant pourquois ça ne ses pas bien dérouler     |   suprime un utilisateur     |

</br>
ROUTES PROJECTS
</br></br>

|   VERB HTTP    |       point d'accés       |   corp requette    |   type de </br>reponse attendu    |   fonction     |
|   ---     |           :-:             |   ---            |   :-:                        |   :-:     |
|   **POST**    |   /api/projects    |   { </br>```"user_id":number,``` </br> ```"nom":"string",``` </br> ```"description":"string",``` </br> ```"lien":"string",``` </br> ```"img_url":number```</br>}    |status(200): retourne un message indiquant que tout c'est bien passer</br>status(400):  retourne une erreur expliquant pourqois |  crée un projects </br> ne pas oubliez le token dans le header    |
|   **GET**    |   /api/projects    |   Aucun body n'est requis    |   status(200): retourne tous les project</br> status(404): retourne un message expliquant </br>qu'il n'y a pas de projets enregistrer     |   retourne les projets enregistrer sur la BDD    |
|   **GET**    |   /api/projects/:id    |   Aucun body n'est requis    |   status(200): retourne le projet ciblé</br> status(404): retourne un message expliquant </br>qu'il n'y a pas de projet enregistrer avec cet id    |   retourne le projet ciblé     |
|   **PUT**    |   /api/projects/:id    |   { </br> ```"nom":"string",``` </br> ```"description":"string",``` </br> ```"lien":"string",``` </br> ```"img_url":"string"```</br>}    |    status(200): modifie les informations d'un projet</br> status(400):retourne un message d'ereur expliquant pourqouis   |   permet de modifier un projet,</br> ne pas oublier le token  dans le header de la requete    |
|   **DELETE**    |    /api/projects/:id   |   Aucun body n'est requis mais ne pas oublier </br> le token dans le header   |  status(200): message indiquant que la req c'est bien passer</br>status(400): un message expliquant pourquois ça ne ses pas bien dérouler     |   supprime un projet     |

</br></br></br></br></br></br></br></br></br></br></br>
© copyright [magin code](magin.code@gmail.com)
