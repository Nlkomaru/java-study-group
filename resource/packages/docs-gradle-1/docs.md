# Gradleのインストール

## Gradleとは

Gradleは、JavaやGroovy、Kotlinなどのプログラミング言語で書かれたプロジェクトをビルドするためのビルドツールです。

GroovyもしくはKotlinで記述されたビルドスクリプトを記述することで、ビルドの設定を柔軟に行うことができます。

## Gradleのインストール

### Chocolateyを使う場合

```shell
choco install gradle
```

### 手動でインストールする場合

1. [Gradleの公式サイト](https://gradle.org/install/)からGradleのバイナリをダウンロードします。(binaries-onlyを選択)
2. ダウンロードしたzipファイルを解凍します。(gradle-x.x.x)
3. `C:\gradle`などの適当なディレクトリにGradleを配置します。
4. 環境変数`GRADLE_HOME`にGradleのディレクトリを設定します。 `C:\gradle`の場合は`C:\gradle\gradle-x.x.x`です。
5. 環境変数`PATH`に`%GRADLE_HOME%\bin`を追加します。
6. コマンドプロンプトを再起動し、`gradle -v`コマンドを実行してバージョンが表示されればインストール完了です。