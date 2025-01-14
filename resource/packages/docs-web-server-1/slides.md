---
theme: ../theme-modern
download: true
---

# Spring Bootを使ったWebアプリケーション開発1

---

# 目次

<Toc maxDepth="1"></Toc>

---

# 目的

Javaで、Webアプリケーションを開発するための方法を知る

---

# Spring Bootとは

Spring Bootは、Spring Frameworkをベースにしたアプリケーションを簡単に作成するためのフレームワークです。

Spring Frameworkは、Javaのフレームワークの中でも、最も人気のあるフレームワークの一つです。

Spring Bootは、DIなどによって、アプリケーションの設定を行ってくれます。

ほかにも、Javaフレームワークには、以下のようなものがあります。

- Quarkus
- Micronaut

---

# Spring Bootを始める

1. https://start.spring.ioにアクセス
2. プロジェクトの設定を行う
3. Project - Gradle - kotlin
4. Language - Java
5. Spring Boot - 3.4.1
6. Group - com.github.$username
7. Artifact - demo
8. Name - demo
9. Package name - com.github.$username.demo
10. Packaging - Jar
11. Java - 21
12. Dependencies - Spring Web, Spring Boot DevTools, Spring Data JDBC
13. Generate

---

# gradleの設定

build.gradle.ktsを開いて、以下のように修正します。

```diff

dependencies{
...
+   runtimeOnly("com.h2database:h2")
}

+springBoot {
+   mainClass = "$group.demo.DemoApplication"
+}


```

---

# Spring Bootの設定

resources/application.propertiesを開いて、以下のように修正します。

```properties
spring.application.name=demo
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=nikomaru
spring.datasource.password=password
spring.sql.init.mode=always
```

ここでは、データベースにH2を使うように設定しています。

h2は、インメモリデータベースで、簡単に使うことができます。

---

# Spring Bootの起動

```shell
./gradlew bootRun
```

上記のコマンドを実行すると、port8080でアプリケーションが起動します。

http://localhost:8080にアクセスして、アプリケーションが起動していることを確認してください。

多分、エラーが出ると思いますが、これは、まだコントローラが作成されていないためです。

---

# Spring Bootのコントローラを作成

まず、GreetingというRecordクラスを作成します。

```java
package com.github.$username.demo;

public record Greeting(long id, String content) {
}
```

---

次に、GreetingControllerというクラスを作成します。

```java
package com.github.$username.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
}
```

実際に、コントローラを作成して、アプリケーションを起動してみましょう。

---

# APIのテスト

再び、`./gradlew bootRun`を実行して、アプリケーションを起動します。

そのあと、http://localhost:8080/greeting
にアクセスして、`{"id":1,"content":"Hello, World!"}`と表示されれば成功です。

---

# それぞれのクラスの説明(Greeting Record)

まず、Recordクラスは、Java14から導入されたクラスです。
Springでは、このRecordクラスをJacksonというライブラリを使って、JSONに変換しています。

今回の場合、Greetingクラスは、idとcontentというフィールドを持っています。

---

# それぞれのクラスの説明(GreetingController)

GreetingControllerクラスは、コントローラクラスです。

@RestControllerアノテーションは、このクラスがコントローラクラスであることを示しています。

@GetMappingアノテーションは、HTTP GETリクエストを受け取ることを示しています。

atomicLongは、JavaのAtomicLongクラスです。これは、スレッドセーフなlong型の値を保持するクラスです。
これによって、idをインクリメントして、ユニークなidを生成しています。

@RequestParamアノテーションは、HTTPリクエストのパラメータを受け取ることを示しています。
今回の場合、nameというパラメータを受け取って、それを使って、Greetingクラスを生成しています。
特に指定していない場合は、Worldという文字列を使っています。

@GetMappin("/greeting")は、/greetingというパスにアクセスしたときに、このメソッドが呼び出されることを示しており、今回はGreetingsクラスを返しています。
これが、JSONに変換されて、クライアントに返されます。

---

# JPAを使ってデータベースにアクセスする

Spring Data JPAを使って、データベースにアクセスする方法を説明します。

Spring Data JPAは、JPAを使ってデータベースにアクセスするためのインターフェースを提供しています。
実際の実装としてはHibernateを使っています。

JPAは、Java Persistence APIの略で、JavaのオブジェクトをデータベースにマッピングするためのAPIです。
前回のJDBCとは違い、SQLを直接書く必要がなく、Javaのオブジェクトを使ってデータベースにアクセスできます。

先に記述した、application.propertiesに、データベースの設定を記述しています。
---

# データベースのテーブルを作成する

resources/schema.sqlを作成して、以下のように記述します。

```
CREATE TABLE IF NOT EXISTS student(
    id  INTEGER PRIMARY KEY,
    name VARCHAR(30),
    password VARCHAR(10)
);
```

---

# Student用のControllerを作成する

```java
package com.github.$username.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class StudentController {
   
}
```

---

# データを挿入する

```java

@RestController
public class StudentController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/student/add")
    String addStudent(@RequestParam(value = "name", defaultValue = "John Doe") String name) {
        long id = counter.incrementAndGet();
        String password = "password";
        jdbcTemplate.update("INSERT INTO student VALUES (?, ?, ?)", id, name, password);

        return "あなたのidは" + id + "で、パスワードは、" + password + "です。";
    }
}
```

@Autowireアノテーションは、Springによって、JdbcTemplateクラスのインスタンスを生成して、インジェクションしています。
これにより、JdbcTemplateクラスを使って、データベースにアクセスすることができます。

---

# データを取得する

```java
@RestController
public class StudentController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/student/list")
    List<Student> listStudents() {
        return jdbcTemplate.query("SELECT * FROM student", (rs, rowNum) -> new Student(rs.getLong("id"), rs.getString("name")));
    }


    record Student(
            Long id,
            String name
    ){}
}
```

---