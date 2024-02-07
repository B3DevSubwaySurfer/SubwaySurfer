use serde::Serialize;
use mysql::prelude::*;
use mysql::*;
use crate::db::POOL;

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Station {
    id: i32,
    name: String,
    metro_line: MetroLine, 
}

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Borne {
    id: i32,
    station_id: i32,
    level: i32,
    max_level: i32,
}

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct MetroLine {
    id: i32,
    name: String,
}

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Agent {
    name: String,
    status: String,
}

#[tauri::command]
pub async fn get_stations() -> Vec<Station> {
    let mut conn = POOL.get_conn().unwrap();
    let result: Vec<Station> = conn.query_map(
        "SELECT s.id, s.name, m.id, m.name FROM stations s INNER JOIN metro_lines m ON s.line_id = m.id",
        |(id, name, line_id, line_name)| {
            Station { 
                id, 
                name, 
                metro_line: MetroLine { id: line_id, name: line_name }
            }
        },
    ).unwrap();

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

#[tauri::command]
pub async fn get_agents() -> Vec<Agent> {
    let mut conn = POOL.get_conn().unwrap();
    let result: Vec<Agent> = conn.query_map(
        "SELECT name, status FROM agents",
        |(name, status)| {
            Agent { name, status }
        },
    ).unwrap();

    result
}