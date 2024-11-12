---
theme: ../theme-modern
download: true
---

# Gradleのインストール

---

# 目次

<Toc maxDepth="1"></Toc>

---

# Gradleとは

- GroovyもしくはKotlinで記述されたビルドスクリプトを実行するビルドツール
- Mavenと同様に依存関係の解決やビルドの実行を行う
- Scriptを記述することで、ビルドのカスタマイズが可能
- プラグインを利用することで、様々な機能を追加できる


---

# Gradleのインストール(Chocolateyを利用してインストールする場合)

Chocolateyを利用してインストールする場合

```shell
choco install gradle
```

---

# Gradleのインストール(手動でインストールする場合 - Windows)

1. [Gradleの公式サイト](https://gradle.org/install/)からGradleのバイナリ(binary-only)をダウンロード
3. Gradleのディレクトリを作成 (例: `C:\Gradle`)
4. 作成したディレクトリにGradleのzipファイルを展開 (例: `C:\Gradle\gradle-6.7.1`)
3. 環境変数`GRADLE_HOME`にGradleのインストールディレクトリを設定 (例: `C:\Gradle\gradle-6.7.1`)
4. 環境変数`Path`に`%GRADLE_HOME%\bin`を追加
5. `gradle -v`でバージョンが表示されればインストール完了

```shell
------------------------------------------------------------
Gradle 8.11
------------------------------------------------------------

Build time:    2024-11-11 13:58:01 UTC
Revision:      b2ef976169a05b3c76d04f0fa76a940859f96fa4

Kotlin:        2.0.20
Groovy:        3.0.22
...
```

