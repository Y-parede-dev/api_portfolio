# API pour porte folio

></br>***DOCUMENTATION API POUR PORTE FOLIO***
</br></br>
>Cette API a pour but de vous aider a crée votre propre porte-folio, elle est fournie avec une base de données mySql.
</br>
Si vous rencontrez le moindre problème :</br>&nbsp;&nbsp;- je vous invite à taper votre problème dans la section pull request n'hésiter pas à y introduire des screens shot de votre souci ainsi que les appels API que vous tentez de faire.
</br></br>

## Premiére étape

</br>

### Avec phpMyAdmin

</br>
Tout dabord commencer par ouvrir votre phpmyadmin, si vous ne l'avez pas installer je vous invite à télecharger l'un des programes suivant </br></br>

></br>si vous etes sous windows :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[wamp](https://www.wampserver.com/)</br></br>
>si vous etes sous mac (fonctione aussi sous windows) :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[mamp](https://www.mamp.info/en/downloads/)</br></br>
>si vous etes sous linux :</br></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[lamp](https://www.tech2tech.fr/installation-de-lamp-sur-ubuntu-20-04/)</br></br>

### je vous invite a télécharger la base de donnée préalablement crée pour vous en cliquant sur le lien suivant :</br>

[download DATABASE](./assets/fichier_doc/Database_pf.zip)</br>

### une fois fait ouvrez votre phpMyAdmin

></br>conseil utile :</br></br>ne rester pas sur l'utilisateur de base qui doit etre : Root </br>crée plutot un utilisateur avec les privileges directement sur phpMyAdmin vous trouverais un tuto ici une fois fait deconecter vous de ROOT et passer sur votre profil</br></br>

sur phpMyAdmin dans la barre de navigation en haut cliquer sur importer base de données (img.1)</br></br>
![img_import](assets/images/doc/doc_import_1.png)</br></br>

cliquez ensuite sur choisir un fichier charger le fichier que vous avez décompresser plus tot</br></br>
![img_choise_file](assets/images/doc/doc_import_2.png)</br></br>

cliquez sur ``` Exécuter ``` a droite de la page </br>
![img_executer](assets/images/doc/doc_import_3.png)</br></br>

Vous voila avec la base de donnée crée vous devriez avoir une page comme cet image</br></br>
![img_BDD_Good](assets/images/doc/doc_import_4.png)</br></br>

si vous le souhaitez vous pouvez observer 2 tables ` users ` & ` projects `

### En ligne de commande

    A VENIR

|   VERB    |       point d'accés       |   corp requette    |   type de reponse attendu    |   fonction     |
|   ---     |           :-:             |   ---              |   :-:                        |   :-:     |
|   **POST**    |   /api/profil/sigup       |   ```{``` </br>```"nom":"string",``` </br> ```"prenom":"string",``` </br> ```"mail":"email",``` </br> ```"pass":"string",``` </br> ```"age":number```</br>```}```    |   status(200) : creation de l'utilisateur dans la bdd </br>si probleme</br>status(404): le probleme sera marque dans la reponse HTTP       |   Création d'un utlisateur avec :</br>- mot de passe sécurise et haché </br> - email valide(votre@mail.ext)      |
|   **POST**    |   /api/profil/login    |   ```{``` </br> ```"mail":"email",``` </br> ```"pass":"string",```</br>```}```    |status(200): retourne un jeton token</br>status(400):  retourne une erreur mail ou mot de pass|   se connecte a un profil utilisateur     |
|   **GET**    |   /api/profil    |   Aucun body n'est requis    |   status(200): retourne tous les profils</br> status(404): retourne un message expliquant qu'il n'y a pas d'utilisateur enregistrer     |   retourne les utilisateurs enregistrer sur la BDD    |
|   **GET**    |   /api/profil/:id    |   Aucun body n'est requis    |   :-:     |   :-:     |
|   test    |   test    |   test    |   Aucun body n'est requis     |   :-:     |
|   test    |   test    |   test    |   :-:     |   :-:     |
|   ---     |           :-:             |   ---              |   :-:                        |   :-:     |
