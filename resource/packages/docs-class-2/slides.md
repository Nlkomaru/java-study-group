---
theme: ../theme-modern
download: true
---

# 継承

---

# 目次

<Toc maxDepth="1"></Toc>

---

# 継承

Javaでは、クラスにメソッドなどを記述することで処理を行ってきました。

そうして実装した処理の中に、共通化したい部分がある際に、クラスの継承を利用します。

---

# クラスの継承

クラスの継承は、以下のように記述します。

```java
class サブクラス名 extends スーパークラス名 {
    // サブクラスの処理
}
```


継承を利用することで、スーパークラスのメソッドをそのまま利用することができます。

```java
class Super {
    void method() {
        System.out.println("Super");
    }
}

class Sub extends Super {
    void subMethod() {
        System.out.println("Sub");
    }
}
```

この場合、`Sub`クラスは`Super`クラスの`method`メソッドを利用することができます。

---

# 名称について

スーパークラスとサブクラスの関係について、以下のような名称があります。

- スーパークラス: 親クラス、基底クラス

- サブクラス: 子クラス、派生クラス

---

# サブクラスのコンストラクタ

サブクラスのコンストラクタは、スーパークラスのコンストラクタを呼び出す必要があります。

```java
class User {
    String name;
    User(String name) {
        this.name = name;
    }
    
    String getName() {
        return name;
    }
}

class Student extends User {
    int grade;
    Student(String name, int grade) {
        super(name);
        this.grade = grade;
    }
}
```

実際に書いてみましょう。

---

# Objectクラス

Javaでは、全てのクラスは`Object`クラスを継承しています。

`Object`クラスには、以下のようなメソッドが定義されています。

- `equals`: オブジェクトの比較
- `hashCode`: ハッシュコードの取得
- `toString`: オブジェクトの文字列表現
- `getClass`: クラスの取得
- `clone`: オブジェクトの複製

などがあります。

---

# Objectクラスの継承

```java
class User extends Object {
    String name;
    User(String name) {
        this.name = name;
    }
    
    String getName() {
        return name;
    }
}
```

Javaのクラスはすべて`Object`クラスを継承しているため、Userクラスは`Object`クラスを継承していることになります。
実際は、`extends Object`は省略されているため、記述する必要はありません。

---

# オーバーライド(Override)

サブクラスでスーパークラスのメソッドを再定義することをオーバーライドと言います。

```java
class User {
    String name;
    User(String name) {
        this.name = name;
    }
    
    String getName() {
        return name;
    }
    
    @Override
    public String toString() {
        return "User: " + name;
    }
}
```

`@Override`アノテーションを付けることで、オーバーライドしていることを明示することができます。

ない場合と比較して、どのように動作が変わるか確認してみましょう。

---

# 抽象クラス(abstract class)

抽象クラスは、インスタンスを生成することができないクラスです。

抽象クラスは、以下のように記述します。

```java
abstract class User {
    String name;
    User(String name) {
        this.name = name;
    }
}

class Student extends User {
    int grade;
    Student(String name, int grade) {
        super(name);
        this.grade = grade;
    }
}
```

```java
User user = new User("test"); // エラー

```

---

