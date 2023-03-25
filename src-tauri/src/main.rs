// #![cfg_attr(
//     all(not(debug_assertions), target_os = "windows"),
//     windows_subsystem = "windows"
// )]

// pub fn main() {
//     tauri_app::AppBuilder::new().run();
// }

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("main.rs: Hello, {}! You've been greeted from Rust! cur is mobile ? : {}", name, cfg!(mobile)); // 增加
    format!("Hello, {}! You've been greeted from Rust! cur is mobile ? : {}", name, cfg!(mobile))
}

// #[cfg(mobile)]
// fn do_something() {
//     println!("Hello from Mobile!");
// }

// #[cfg(desktop)]
// fn do_something() {
//     println!("Hello from Desktop!");
// }

fn main() {
    if cfg!(mobile) {
        println!("Hello from Mobile!");
        lib_name2::AppBuilder::new().run();
    } else {
        println!("Hello from Desktop!");
        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![greet])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
