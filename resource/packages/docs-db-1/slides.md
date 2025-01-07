---
theme: ../theme-modern
download: true
---

# Javaにおけるデータベースアクセス

---

# 目次

<Toc maxDepth="1"></Toc>

---

# はじめに

今回はJavaにおけるデータベースアクセスについて学びます。

Webアプリケーションを作成する際には、データベースとの連携が必要になります。
PostgreSQLやSQLiteなどのデータベースをJavaから操作する方法を学びます。

今回は、SQLiteを使用します。

---

# SQLite

SQLiteは、軽量なデータベースエンジンです。

SQLiteは、データベースをファイルとして保存するため、データベースサーバを立てる必要がありません。


---

# 例外処理

データベースアクセスは、例外が発生する可能性があります。
例外処理を行うことで、プログラムが正常に動作するようにします。

例外処理とは、プログラム実行中に発生する予期しない状況に対処するための仕組みです。
try-catch文を使用して、例外処理を行います。

```java

try {
    // 例外が発生する可能性のある処理
    100 / 0;
} catch (例外クラス名 変数名) {
    // 例外が発生した場合の処理
    System.out.println("0で割ることはできません");
}finally {
    // 例外の有無に関わらず実行される処理
    //任意の処理 (ファイルのクローズなど)
}
```

---

# JDBC

Java Database Connectivity（JDBC）は、JavaからデータベースにアクセスするためのAPIです。

JDBCを使用することで、Javaからデータベースに接続し、データの取得や更新を行うことができます。

```diff title="build.gradle.kts"
dependencies {
+    implementation("org.xerial:sqlite-jdbc:3.47.2.0")
    
    // 以下のライブラリも追加
}
```

---

# JDBCの存在確認

JDBCが正しくインストールされているか確認します。

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        try {
            Class.forName("org.sqlite.JDBC");
            System.out.println("JDBCが正しくインストールされています");
        } catch (ClassNotFoundException e) {
            System.out.println("JDBCがインストールされていません");
        }
    }
}
```

---

# データベースへの接続

データベースに接続するには、`Connection`クラスを使用します。

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:test.db");
            System.out.println("データベースに接続しました");
        } catch (SQLException e) {
            System.out.println("データベースに接続できませんでした");
        }
    }
}
```

このコードでは、`test.db`という名前のデーエベースに接続しています。

---

# データベースの作成

データベースを作成するには、`Statement`クラスを使用します。

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:test.db");
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
            System.out.println("テーブルを作成しました");
        } catch (SQLException e) {
            System.out.println("テーブルを作成できませませんでした");
        }
    }
}
```

このコードでは、`users`という名前のテーブルを作成しています。

---

# データの挿入(悪い例)

データを挿入するには、`Statement`クラスを使用します。

```java

Class.forName("org.sqlite.JDBC");
connection = DriverManager.getConnection("jdbc:sqlite:test.db");
statement = connection.createStatement();
statement.executeUpdate("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");

statement = connection.createStatement();

int id = 1;
String name = "Alice";
statement.executeUpdate("INSERT INTO users (id,name) VALUES (" + id + ",'" + name + "')");

statement.close();
connection.close();

```

---

# データの挿入(良い例)

データを挿入する際には、`PreparedStatement`クラスを使用します。

```java
Connection connection = DriverManager.getConnection("jdbc:sqlite:test.db");
Statement statement = connection.createStatement();
//dropしておく
statement.executeUpdate("DROP TABLE IF EXISTS users");
statement.executeUpdate("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");

PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO users (id,name) VALUES (?,?)");
preparedStatement.setInt(1, 1);
preparedStatement.setString(2, "Alice");
preparedStatement.executeUpdate();

preparedStatement.close();
statement.close();
connection.close();
```

PreparedStatementを使用することで、SQLインジェクション攻撃を防ぐことができます。

そのため、PreparedStatementを使用することをお勧めします。

また、型の変換を行う必要がなくなります。

---

# データの取得

データを取得するには、`ResultSet`クラスを使用します。

```java
Connection connection = DriverManager.getConnection("jdbc:sqlite:test.db");

Statement statement = connection.createStatement();

ResultSet resultSet = statement.executeQuery("SELECT * FROM users");

while (resultSet.next()) {
    int id = resultSet.getInt("id");
    String name = resultSet.getString("name");
    System.out.println("id: " + id + ", name: " + name);
}

resultSet.close();
statement.close();
connection.close();
```

---

# まとめ

- JDBCを使用することで、Javaからデータベースにアクセスすることができます。
- データベースに接続するには、`Connection`クラスを使用します。
- データベースにデータを挿入するには、`PreparedStatement`クラスを使用します。
- データベースからデータを取得するには、`ResultSet`クラスを使用します。