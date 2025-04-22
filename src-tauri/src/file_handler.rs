use std::fs;
use std::sync::Mutex;
use tauri::{command, State, AppHandle};
use tauri_plugin_dialog::DialogExt;
use std::path::PathBuf;

pub struct AppState {
    last_opened_file: Mutex<Option<String>>,
}

#[command]
pub async fn open_md_file(app: AppHandle, state: State<'_, AppState>) -> Result<String, String> {
    let (tx, rx) = std::sync::mpsc::channel();

    app.dialog()
        .file()
        .add_filter("Markdown", &["md"])
        .pick_file(move |path| {
            let _ = tx.send(path);
        });

    let file_path = rx.recv().unwrap().ok_or("No file selected")?;

    let content = fs::read_to_string(file_path.to_string())
        .map_err(|e| format!("Failed to read file: {}", e))?;

    let mut last_file = state.last_opened_file.lock().unwrap();
    *last_file = Some(file_path.to_string());

    Ok(content)
}

#[tauri::command]
pub fn save_markdown_file(path: String, content: String) -> Result<(), String> {
    let path_buf = PathBuf::from(path);
    fs::write(path_buf, content).map_err(|e| e.to_string())
}

