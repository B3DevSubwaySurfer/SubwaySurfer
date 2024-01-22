use serde::Serialize;
use mysql::prelude::*;
use mysql::*;
use crate::db::POOL;

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Station {
    id: i32,
    name: String,
}

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Borne {
    id: i32,
    station_id: i32,
    level: i32,
    max_level: i32,
}

#[tauri::command]
pub async fn get_stations() -> Vec<Station> {
    let mut conn = POOL.get_conn().unwrap();
    let result: Vec<Station> = conn.query_map(
        "SELECT id, name FROM stations",
        |(id, name)| {
            Station { id, name }
        },
    ).unwrap();

    //println!("{:?}", result); // Ajoutez cette ligne

    result
}

#[tauri::command]
pub async fn get_bornes() -> Vec<Borne> {
    let mut conn = POOL.get_conn().unwrap();
    let result: Vec<Borne> = conn.query_map(
        "SELECT id, station_id, level, max_level FROM bornes",
        |(id, station_id, level, max_level)| {
            Borne { id, station_id, level, max_level }
        },
    ).unwrap();

    result
}