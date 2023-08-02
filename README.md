# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Install

```shell
  # windows
  scoop install volta
  # || linux  (node18 required ubuntu-20) 
  # sudo apt install build-essential
  # sudo apt-get install libvips libvips-dev libvips-tools
  # curl https://get.volta.sh | bash
  # source /etc/profile
  # sudo chmod -R 777 ./
  # git config --global core.autocrlf false

  make init
  make start

```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

```shell
cd src-tauri
cargo add tauri@2.0.0-alpha.0
cargo add tauri-build@2.0.0-alpha.0 --build


cargo tauri android init
cargo tauri android dev
cargo tauri android build
```

```properties
<!-- src-tauri/gen/android/tauri_app/key.properties -->
storePassword=2011054984
keyPassword=2011054984
keyAlias=chat-tan
storeFile=D:\\andorid\\keys\\chat-tan.jks
```

```kts
<!-- src-tauri/gen/android/tauri_app/app/build.gradle.kts -->

import java.util.Properties
import java.io.FileInputStream

plugins {
   ...
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    defaultConfig {
        ...
    }

    signingConfigs {
        create("release") {
            if (keystorePropertiesFile.exists()) {
                keyAlias = keystoreProperties["keyAlias"] as String
                keyPassword = keystoreProperties["keyPassword"] as String
                storeFile = file(keystoreProperties["storeFile"])
                storePassword = keystoreProperties["storePassword"] as String
            }
        }
    }

    buildTypes {
        ...
        getByName("release") {
            ...
            signingConfig = signingConfigs.getByName("release")
        }
    }

}

```

```kts
<!-- src-tauri/gen/android/tauri_app/build.gradle.kts -->
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

// https://kotlinlang.org/docs/gradle-configure-project.html#gradle-java-toolchains-support
tasks.withType(JavaCompile::class.java) {
    sourceCompatibility = "11"
    targetCompatibility = "11"
}

tasks.withType(KotlinCompile::class.java) {
    kotlinOptions {
        jvmTarget = "11"
    }
}
```
