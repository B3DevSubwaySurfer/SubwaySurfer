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
    Ok(())
}

// Cette fonction crée la table "stations" dans la base de données "subwaysurfer" si elle n'existe pas déjà.
pub fn create_stations_table() -> std::result::Result<(), mysql::Error> {
    let mut conn = POOL.get_conn()?;
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS subwaysurfer.stations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
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

// Cette fonction insère des stations dans la table "stations" et retourne leurs ID.
pub fn insert_stations() -> std::result::Result<Vec<i32>, mysql::Error> {
    let mut conn = POOL.get_conn()?;
    let stations = vec!["Station 1", "Station 2"];
    let mut ids = Vec::new();
    for station in stations {
        let results: Vec<(i32,)> = conn.exec(
            r"SELECT id FROM subwaysurfer.stations WHERE name = :name",
            params! {
                "name" => station,
            }
        )?;
        if results.is_empty() {
            conn.exec_drop(
                r"INSERT INTO subwaysurfer.stations (name) VALUES (:name)",
                params! {
                    "name" => station,
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