# API pour portfolio

></br>***DOCUMENTATION API POUR PORTFOLIO***</br></br>
>Cette API a pour but de vous aider à créer votre propre portfolio, elle est fournie avec une base de données mySql.</br>
>Si vous rencontrez le moindre problème :</br>&nbsp;&nbsp;- je vous invite à taper votre problème dans la section pull request n'hésiter pas à y introduire des screens shoot de votre souci ainsi que les appels API que vous tentez de faire.
</br></br>

</br>

## SOMMAIRE

* [Installation de la BDD](#1-instalation--de-la-bdd)</br>
  * [Avec phpMyAdmin](#avec-phpmyadmin)</br>
  * [En ligne de commande](#en-ligne-de-commande)</br>
* [Clonage du repository](#2-clonage-du-repository)</br>
  * [HTTPS](#https)</br>
  * [SSH](#ssh)</br>
* [Installation des dépendances](#3-instalation-des-dépendances)</br>
* [Paramétrage fichier .env](#4-parametrage-fichier-env)</br>
* [Utiliser l'API](#5-utilser-lapi)</br>

## 1. ` Installation  de la BDD `

</br>

### Avec phpMyAdmin

</br>
Tout d'abord commencer par ouvrir votre Phpmyadmin, si vous ne l'avez pas installé je vous invite à télécharger l'un des programmes suivants </br></br>

></br> :thought_balloon: </br></br> si vous êtes sous windows :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[wamp](https://www.wampserver.com/)</br></br>
>si vous êtes sous mac (fonctione aussi sous windows) :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[mamp](https://www.mamp.info/en/downloads/)</br></br>
>si vous êtes sous linux :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[lamp](https://www.tech2tech.fr/installation-de-lamp-sur-ubuntu-20-04/)</br> </br>

### je vous invite à télécharger la base de données préalablement créée pour vous en cliquant sur le lien suivant :</br>

[download DATABASE](./assets/fichier_doc/Database_pf.zip)</br>
Puis, décompréssez le</br>

### une fois fait ouvrez votre Phpmyadmin

></br> :thought_balloon: Conseils utiles :</br></br>Ne pas rester sur l'utilisateur de base qui doit être : Root créée plutôt un utilisateur avec les privilèges directement sur Phpmyadmin.</br> Vous trouverez un tuto ici (prochainement) une fois fait déconnecter vous de ROOT et passer sur votre profil</br></br>

Sur Phpmyadmin dans la barre de navigation en haut cliquée sur importer base de données (image.1)</br></br>
![img_import](https://github.com/**Y-parede-dev/api_portfolio/blob/master/assets**/images/doc/doc_start.PNG?raw=true)</br></br>
cliquez ensuite sur choisir un fichier chargé le fichier que vous avez décompressé plus tôt</br></br>
![img_choix_fichier](https://github.com/Y-parede-dev/api_portfolio/blob/master/assets/images/doc/doc_import_2.png?raw=true)</br></br>
Cliquez sur ``` Exécuter ``` a droite de la page</br></br>
![img_Executer](https://github.com/Y-parede-dev/api_portfolio/blob/master/assets/images/doc/doc_import_3.png?raw=true)</br></br>
Vous voilà avec la base de données créée vous devriez avoir une page comme cette image</br></br>
![img_Good](https://github.com/Y-parede-dev/api_portfolio/blob/master/assets/images/doc/doc_good_phase.PNG?raw=true)</br></br>
vous pouvez observer 2 tables ` users ` & ` projects `

### En ligne de commande

    A VENIR

## 2. ` Clonage du repository `

## HTTPS

>> Placez-vous dans votre environnement de travail avec le terminal vs Code ou directement en exécutant votre cmd.exe en administrateur</br> puis tapez la commande : `git init` puis ` git clone https://github.com/Y-parede-dev/portfolio-v1.0-backend.git `
</br>

</br>

## SSH

>> Placez-vous dans votre environnement de travail avec le terminal vs Code ou directement en exécutant votre cmd.exe en administrateur</br> puis tapez la commande  `git init` puis ` git clone git@github.com:Y-parede-dev/portfolio-v1.0-backend.git `</br>
>>> :thought_balloon: pour utiliser le ssh vous devez avoir au préalable une clé ssh connecter à votre compte github</br>
Vous trouverez prochainement ici comment générer une clé ssh et la charger sur github</br>
</br>

## 3. ` Installation des dépendances `

Vous avez besoin de node.js et de npm sur votre machine</br>
dans l'invité de commande placer vous sur votre répertoire que vous venez de cloner ` cd ./portfolio-v1.0-backend `</br>
puis tapez ` npm init ` puis ` npm install `</br>
</br>
Les dépendances téléchargées nous pouvons passer à la suite
</br>

## 4. ` Paramétrage fichier .env `

</br> Repéré le fichier nommé ` .exemple env ` renommé l'en ` .env `</br> ouvrer l'avec votre éditeur de code favori pour ma part c'est ` vs Code ` une fois dedans remplissez les informations nécessaires puis enregistrer ` ctrl+s ` dans ` vs Code `</br> a ce stade si dans votre cmd vous tapez la commande ` npm run dev ` (ou ` yarn dev ` si yarn est installé sur votre machine)</br> vous devriez avoir un message comme ci-dessous  :</br></br>

![img_good_file](https://github.com/Y-parede-dev/api_portfolio/blob/master/assets/images/doc/connexion_good.PNG?raw=true)</br>
Félicitation votre API est prête à être utilisé</br>

## 5. ` Utilsez l'api `

ROUTES USERS
</br>

|   VERB HTTP    |       point d'accés       |   corp requette    |   type de </br>reponse attendu    |   fonction     |
|   ---     |           :-:             |   ---            |   :-:                        |   :-:     |
|   **POST**    |   /api/profil/sigup       |   { </br>```"nom":"string",``` </br> ```"prenom":"string",``` </br> ```"mail":"email",``` </br> ```"pass":"string",``` </br> ```"age":number```</br>}    |   status(200) : Création de l'utilisateur dans la bdd </br>status(404): le problème sera marqué dans la réponse HTTP       |   Création d'un utlisateur avec :</br>- mot de passe sécurise et haché </br> - email valide(votre@mail.ext)      |
|   **POST**    |   /api/profil/login    |   { </br> ```"mail":"email",``` </br> ```"pass":"string",```</br>}    |status(200): retourne un jeton token</br>status(400):  retourne une erreur mail ou mot de passe|  se connecte à un profil utilisateur     |
|   **GET**    |   /api/profil    |   Aucun body n'est requis    |   status(200): retourne tous les profils</br> status(404): retourne un message expliquant</br> qu'il n'y a pas d'utilisateur enregistrer     |   retourne les utilisateurs enregistrer dans la BDD    |
|   **GET**    |   /api/profil/:id    |   Aucun body n'est requis    |   status(200): retourne le profil ciblé</br> status(404): retourne un message expliquant </br>qu'il n'y a pas d'utilisateur enregistrer avec cet id    |   retourne l'utilisateur ciblé     |
|   **PUT**    |   /api/profil/:id    |   { </br>```"nom":"string",``` </br> ```"prenom":"string",``` </br> ```"mail":"email",``` </br> ```"pass":"string",``` </br> ```"age":number```,</br>```"img_url":string```</br>}    |    status(200): modifie les informations de l'utilisateur</br> status(400): retourne un message d'érreur    |   permet de modifier son profil,</br> ne pas oublier le token  dans le header de la requête    |
|   **DELETE**    |    /api/profil/:id   |   Aucun body n'est requis mais ne pas oublier </br> le token dans le header   |  status(200): message indiquant que la requête c'est bien passer</br>status(400): un message expliquant pourquoi ça ne ses pas bien dérouler     |   supprime un utilisateur     |

</br>
ROUTES PROJECTS
</br></br>

|   VERB HTTP    |       point d'accés       |   corp requette    |   type de </br>reponse attendu    |   fonction     |
|   ---     |           :-:             |   ---            |   :-:                        |   :-:     |
|   **POST**    |   /api/projects    |   { </br>```"user_id":number,``` </br> ```"nom":"string",``` </br> ```"description":"string",``` </br> ```"lien":"string",``` </br> ```"img_url":number```</br>}    |status(200): retourne un message indiquant que tout c'est bien passer</br>status(400):  le problème sera marqué dans la réponse HTTP |  créée un projet </br> ne pas oubliez le token dans le header    |
|   **GET**    |   /api/projects    |   Aucun body n'est requis    |   status(200): retourne tous les project</br> status(404): retourne un message expliquant </br>qu'il n'y a pas de projets enregistrer     |   retourne les projets enregistrer sur la BDD    |
|   **GET**    |   /api/projects/:id    |   Aucun body n'est requis    |   status(200): retourne le projet ciblé</br> status(404): retourne un message expliquant </br>qu'il n'y a pas de projet enregistrer avec cet id    |   retourne le projet ciblé     |
|   **PUT**    |   /api/projects/:id    |   { </br> ```"nom":"string",``` </br> ```"description":"string",``` </br> ```"lien":"string",``` </br> ```"img_url":"string"```</br>}    |    status(200): modifient les informations d'un projet</br> status(400): retourne un message d'érreur expliquant pourqoui   |   permet de modifier un projet,</br> ne pas oublié le token  dans le header de la requête    |
|   **DELETE**    |    /api/projects/:id   |   Aucun body n'est requis mais ne pas oublier </br> le token dans le header   |  status(200): message indiquant que la requête c'est bien passer</br>status(400): un message expliquant pourquoi ça ne ses pas bien dérouler     |   supprime un projet     |

</br></br></br></br></br></br></br></br></br></br></br>
© copyright [magin code](magin.code@gmail.com)
