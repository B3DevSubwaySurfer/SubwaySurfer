#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Ces lignes importent les modules `db` et `server`.
mod db;
mod server;

// Cette ligne importe la fonction `get_stations` du module `server`.
use server::get_bornes;
use server::get_stations;
use server::get_agents;

// La fonction `main` est le point d'entrée de notre application.
pub fn main() -> std::io::Result<()> {
    // Ces lignes appellent les fonctions du module `db` pour créer la base de données et les tables.
    db::create_database().expect("Failed to create database");
    db::create_metro_lines_table().expect("Failed to create metro lines table"); 
    db::create_stations_table().expect("Failed to create stations table");
    db::create_bornes_table().expect("Failed to create bornes table");
    db::create_agents_table().expect("Failed to create agents table");

    // Insérer les lignes de métro
    // Vous devez implémenter la fonction `insert_metro_lines` vous-même.
    db::insert_metro_lines().expect("Failed to insert metro lines");
    db::insert_agents().expect("Failed to insert agents");

    // Insérer les stations et récupérer leurs ID
    let station_ids = db::insert_stations().expect("Failed to insert stations");

    // Pour chaque ID de station, insérer des bornes
    for station_id in station_ids {
        db::insert_bornes(station_id).expect("Failed to insert bornes");
    }

    // Cette partie crée et exécute votre application Tauri.
    tauri::Builder::default()
        // Enregistre les fonctions `get_stations` et `get_bornes` comme des gestionnaires d'appel, permettant au code JavaScript du frontend d'appeler ces fonctions via l'API `invoke` de Tauri.
        .invoke_handler(tauri::generate_handler![get_stations, get_bornes, get_agents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // La fonction `main` renvoie `Ok(())` pour indiquer qu'elle a terminé avec succès.
    Ok(())
}
