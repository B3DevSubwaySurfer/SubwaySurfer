## Dictionnaire de Données

### Table Films
- **id_film** : INT, identifiant unique du film.
- **titre** : VARCHAR, titre du film.
- **id_realisateur** : INT, identifiant du réalisateur du film.
- **duree** : INT, durée du film en minutes.
- **annee_sortie** : YEAR, année de sortie du film.

### Table Acteurs
- **id_acteur** : INT, identifiant unique de l'acteur.
- **nom** : VARCHAR, nom de famille de l'acteur.
- **prenom** : VARCHAR, prénom de l'acteur.
- **date_naissance** : DATE, date de naissance de l'acteur.

### Table Réalisateurs
- **id_realisateur** : INT, identifiant unique du réalisateur.
- **nom** : VARCHAR, nom de famille du réalisateur.
- **prenom** : VARCHAR, prénom du réalisateur.

### Table Utilisateurs
- **id_utilisateur** : INT, identifiant unique de l'utilisateur.
- **nom** : VARCHAR, nom de famille de l'utilisateur.
- **prenom** : VARCHAR, prénom de l'utilisateur.
- **email** : VARCHAR, adresse email de l'utilisateur.
- **mot_de_passe** : VARCHAR, mot de passe de l'utilisateur.
- **role** : VARCHAR, rôle de l'utilisateur (admin, utilisateur, etc.).


# Modèle Logique de Données (MLD)

## Tables
- Films
    - id_film (PK)
    - titre
    - id_realisateur (FK)
    - duree
    - annee_sortie

- Acteurs
    - id_acteur (PK)
    - nom
    - prenom
    - date_naissance

- Realisateurs
    - id_realisateur (PK)
    - nom
    - prenom

## Contraintes
- Clés étrangères
    - Films.id_realisateur référence Realisateurs.id_realisateur

# Modèle Physique de Données (MPD)

## Script SQL
```sql
-- Création de la base de données
create database StreamingDB;

-- Création des tables
CREATE TABLE Films (
    id_film INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    id_realisateur INT,
    duree INT,
    annee_sortie YEAR
);

CREATE TABLE Acteurs (
    id_acteur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE
);

CREATE TABLE Realisateurs (
    id_realisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL
);

CREATE TABLE Utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(50)
);

-- Exemple de jeu de données
INSERT INTO Films (titre, id_realisateur, duree, annee_sortie) 
VALUES ('Inception', 1, 148, 2010), ('Le Prestige', 2, 130, 2006);

INSERT INTO Acteurs (nom, prenom, date_naissance) 
VALUES ('DiCaprio', 'Leonardo', '1974-11-11'), ('Bale', 'Christian', '1974-01-30');

INSERT INTO Realisateurs (nom, prenom) 
VALUES ('Nolan', 'Christopher'), ('Fincher', 'David');

INSERT INTO Utilisateurs (nom, prenom, email, mot_de_passe, role) 
VALUES ('Dupont', 'Jean', 'jean.dupont@email.com', '1234', 'admin');
```

## 1. Titres et dates de sortie des films du plus récent au plus ancien
```sql
SELECT titre, annee_sortie FROM Films ORDER BY annee_sortie DESC;
```

## 2. Noms, prénoms et âges des acteurs/actrices de plus de 30 ans
```sql
SELECT nom, prenom, TIMESTAMPDIFF(YEAR, date_naissance, CURDATE()) AS age 
FROM Acteurs 
WHERE TIMESTAMPDIFF(YEAR, date_naissance, CURDATE()) > 30 
ORDER BY nom, prenom;
```

## 3. Liste des acteurs/actrices principaux pour un film donné
```sql
-- Remplacer 'id_film' par l'ID du film spécifique
SELECT Acteurs.nom, Acteurs.prenom 
FROM Acteurs 
JOIN Roles ON Acteurs.id_acteur = Roles.id_acteur 
WHERE Roles.id_film = [id_film];
```

## 4. Liste des films pour un acteur/actrice donné
```sql
-- Remplacer 'id_acteur' par l'ID de l'acteur/actrice spécifique
SELECT Films.titre 
FROM Films 
JOIN Roles ON Films.id_film = Roles.id_film 
WHERE Roles.id_acteur = [id_acteur];
```

## 5. Ajouter un film
```sql
INSERT INTO Films (id_film, titre, id_realisateur, duree, annee_sortie) 
VALUES ([id_film], '[titre]', [id_realisateur], [duree], [annee_sortie]);
```

## 6. Ajouter un acteur/actrice
```sql
INSERT INTO Acteurs (id_acteur, nom, prenom, date_naissance) 
VALUES ([id_acteur], '[nom]', '[prenom]', '[date_naissance]');
```

## 7. Modifier un film
```sql
UPDATE Films 
SET [colonne] = '[nouvelle_valeur]' 
WHERE id_film = [id_film];
```

## 8. Supprimer un acteur/actrice
```sql
DELETE FROM Acteurs WHERE id_acteur = [id_acteur];
```

## 9. Afficher les 3 derniers acteurs/actrices ajoutés
```sql
SELECT * FROM Acteurs ORDER BY id_acteur DESC LIMIT 3;
```

## 10. Afficher le film le plus ancien
```sql
SELECT titre FROM Films ORDER BY annee_sortie ASC LIMIT 1;
```

## 11. Afficher l’acteur le plus jeune
```sql
SELECT nom, prenom FROM Acteurs ORDER BY date_naissance DESC LIMIT 1;
```

## 12. Compter le nombre de films réalisés en 1990
```sql
SELECT COUNT(*) FROM Films WHERE annee_sortie = 1990;
```

## 13. Faire la somme de tous les acteurs ayant joué dans un film
```sql
SELECT COUNT(DISTINCT id_acteur) FROM Roles;
```