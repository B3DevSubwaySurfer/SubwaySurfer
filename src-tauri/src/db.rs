use mysql::*;
use mysql::prelude::Queryable;
use mysql::Pool;
use once_cell::sync::Lazy;

// Cette fonction crée une nouvelle instance de Pool pour la connexion à la base de données
// et la stocke dans une variable globale paresseuse (lazy).
pub static POOL: Lazy<Pool> = Lazy::new(|| {
    let url = "mysql://root:@localhost:3306/subwaysurfer";
    Pool::new(url).unwrap()
});

// Cette fonction crée la base de données "subwaysurfer" si elle n'existe pas déjà.
pub fn create_database() -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    conn.query_drop(
        r"CREATE DATABASE IF NOT EXISTS subwaysurfer"
    )?;
    conn.query_drop(
        r"USE subwaysurfer"
    )?;
    Ok(())
}

// Cette fonction crée la table "metro_lines" dans la base de données "subwaysurfer" si elle n'existe pas déjà.
pub fn create_metro_lines_table() -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS subwaysurfer.metro_lines (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(250) NOT NULL UNIQUE
        )"
    )?;
    Ok(())
}

// Modifier la fonction pour ajouter une colonne 'line_id' à la table 'stations'
pub fn create_stations_table() -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS subwaysurfer.stations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            line_id INT,
            FOREIGN KEY (line_id) REFERENCES subwaysurfer.metro_lines(id)
        )"
    )?;
    Ok(())
}

// Cette fonction crée la table "bornes" dans la base de données "subwaysurfer" si elle n'existe pas déjà.
pub fn create_bornes_table() -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS subwaysurfer.bornes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            station_id INT,
            level INT NOT NULL,
            max_level INT NOT NULL,
            FOREIGN KEY (station_id) REFERENCES subwaysurfer.stations(id)
        )"
    )?;
    Ok(())
}

// Modifier la fonction pour inclure 'line_id' lors de l'insertion des stations
pub fn insert_stations() -> std::result::Result<Vec<i32>, mysql::Error> {
    let mut conn = POOL.get_conn()?;
    let stations = vec![
        ("Lille CHU-Eurasanté", 1), 
        ("CHU - Centre O. Lambret", 1),
        ("Porte des Postes", 1),
        ("Wazemmes", 1), 
        ("Gambetta", 1), 
        ("République Beaux-Arts", 1), 
        ("Rihour", 1), 
        ("Gare Lille Flandres", 1), 
        ("Caulier", 1), 
        ("Fives", 1), 
        ("Marbrerie", 1), 
        ("Mairie d'Hellemmes", 1), 
        ("Square Flandres", 1), 
        ("Pont de Bois", 1), 
        ("Villeneuve d'Ascq Hôtel de Ville", 1), 
        ("Triolo", 1), 
        ("Cité Scientifique Pr Gabillard", 1), 
        ("Villeneuve d'Ascq 4 Cantons Stade Pierre Mauroy", 1), 
        ("Saint-Philibert", 2), 
        ("Bourg", 2), 
        ("Maison des Enfants", 2), 
        ("Pont Supérieur", 2), 
        ("Lomme Lambersart", 2), 
        ("Canteleu", 2), 
        ("Bois Blancs", 2), 
        ("Port de Lille", 2), 
        ("Cormontaigne", 2), 
        ("Montebello", 2), 
        ("Porte des Postes", 2), 
        ("Porte d'Arras", 2),
        ("Porte de Douai", 2),
        ("Porte de Valenciennes", 2),
        ("Lille Grand Palais", 2),
        ("Mairie de Lille", 2),
        ("Gare Lille Flandres", 2),
        ("Gare Lille Europe", 2),
        ("Saint-Maurice Pellevoisin", 2),
        ("Mons Sarts", 2),
        ("Mairie de Mons", 3),
        ("Fort de Mons", 3),
        ("Les Prés Edgard Pisani", 3),
        ("Jean Jaurès", 3),
        ("Wasquehal Hôtel de Ville", 3),
        ("Wasquehal Pavé de Lille", 3),
        ("Croix - Centre", 3),
        ("Epeule - Montesquieu", 3),
        ("Roubaix Grand Place", 3),
        ("Eurotéléport", 3),
        ("Roubaix Charles de Gaulle", 3),
        ("Alsace", 3),
        ("Mercure", 3),
        ("Carliers", 3),
        ("Gare de Tourcoing", 3),
        ("Tourcoing Centre", 3),
        ("Colbert", 3),
        ("Phalempins", 3),
        ("Pont de Neuville", 3),
        ("Tourcoing Sébastopol", 3),
        ("Tourcoing C.H. Dron", 3),
    ];
    let mut ids = Vec::new();
    for (station, line_id) in stations {
        let results: Vec<(i32,)> = conn.exec(
            r"SELECT id FROM subwaysurfer.stations WHERE name = :name",
            params! {
                "name" => station,
            }
        )?;
        if results.is_empty() {
            conn.exec_drop(
                r"INSERT INTO subwaysurfer.stations (name, line_id) VALUES (:name, :line_id)",
                params! {
                    "name" => station,
                    "line_id" => line_id,
                }
            )?;
            let id: i32 = conn.last_insert_id() as i32;
            ids.push(id);
        } else {
            ids.push(results[0].0);
        }
    }
    Ok(ids)
}

// Cette fonction insère une liste de bornes dans la table "bornes" pour une station donnée.
pub fn insert_bornes(station_id: i32) -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    let results: Vec<(i32,)> = conn.exec(
        r"SELECT id FROM subwaysurfer.bornes WHERE station_id = :station_id",
        params! {
            "station_id" => station_id,
        }
    )?;
    if results.is_empty() {
        let bornes = vec![
            (100, 100),
            (100, 100),
        ];
        for (level, max_level) in bornes {
            conn.exec_drop(
                r"INSERT INTO subwaysurfer.bornes (station_id, level, max_level) VALUES (:station_id, :level, :max_level)",
                params! {
                    "station_id" => station_id,
                    "level" => level,
                    "max_level" => max_level,
                }
            )?;
        }
    }
    Ok(())
}

// Cette fonction insère des lignes de métro dans la table "metro_lines" et retourne leurs ID.
pub fn insert_metro_lines() -> std::result::Result<Vec<i32>, mysql::Error> {
    let mut conn = POOL.get_conn()?;
    let metro_lines = vec![
        "MetroLine1", 
        "MetroLine2A",
        "MetroLine2B",
    ];
    let mut ids = Vec::new();
    for line in metro_lines {
        let results: Vec<(i32,)> = conn.exec(
            r"SELECT id FROM subwaysurfer.metro_lines WHERE name = :name",
            params! {
                "name" => line,
            }
        )?;
        if results.is_empty() {
            conn.exec_drop(
                r"INSERT INTO subwaysurfer.metro_lines (name) VALUES (:name)",
                params! {
                    "name" => line,
                }
            )?;
            let id: i32 = conn.last_insert_id() as i32;
            ids.push(id);
        } else {
            ids.push(results[0].0);
        }
    }
    Ok(ids)
}