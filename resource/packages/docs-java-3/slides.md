---
theme: ../theme-modern
download: true
---

# Javaを始めよう

---

# 目次

<Toc maxDepth="1"></Toc>

---

# はじめに
## ディレクトリの作成

```bash
$ mkdir java-study
$ cd java-study
$ mkdir test-1
$ cd test-1
```

---

# プロジェクトの作成

```bash
$ gradle init --type java-application
```

1. Enter target Java version: `21`
2. Project name: `Enter>`
3. Select application structure: `1 (Single application project)`
4. Select build script DSL: `1 (Kotlin)`
5. Select test framework: `4 (JUnit Jupiter)`
6. Generate build using new APIs and behavior: `no`


---

# プロジェクトの構成

```bash
test-1
│   gradle.properties
│   gradlew
│   gradlew.bat
│   settings.gradle.kts
├───app
│   │   build.gradle.kts
│   └───src
│       ├───main
│       │   ├───java
│       │   │   └───org
│       │   │       └───example
│       │   │               App.java
│       │   └───resources
│       └───test/
└───gradle
    │   libs.versions.toml
    └───wrapper
            gradle-wrapper.jar
            gradle-wrapper.properties
```

---

# Java compilerを利用したコンパイル

```java
package org.example;

public class App {
    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println(new App().getGreeting());
    }
}
```

```bash
$ cd .\app\src\main\java
$ javac .\org\example\App.java
$ java org.example.App
```

---

# Gradleを利用した方法

## 実行
```bash
$ cd test-1
$ ./gradlew run
```

## ビルド

```kotlin
tasks.jar {
    manifest {
        attributes["Main-Class"] = "org.example.App"
    }
}
```
を追加

```bash
$ ./gradlew build
$ java -jar app/build/libs/app.jar
```

--- 

# Jarファイルとは

- Javaアプリケーションを実行するためのアーカイブファイル
- Classファイル、リソースファイル、メタデータなどをzip形式でまとめたもの