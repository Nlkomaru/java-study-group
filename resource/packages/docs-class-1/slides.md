---
theme: ../theme-modern
download: true
---

# クラスについて

---

# 目次

<Toc maxDepth="1"></Toc>

---

# クラス

クラスはJavaの基本となる仕組みです。<br>
Javaではすべてのコードはクラスの中に書かれます。

Javaにあるクラスは、以下のようなものがあります。

- class
- enum
- record
  など

---

# クラスのメンバー

クラスには以下のようなメンバーがあります。

- コンストラクタ(厳密にはクラスのメンバーではない)
- フィールド
- メソッド
- ネステッドクラス

---

# 実際のコード

```java {*|5-9|2-3|10-21}
public class Student{
    private String name;
    private int age;

    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }

    public String getName(){
        return name;
    }

    public int getAge(){
        return age;
    }
    
    @Override
    public String toString(){
        return "Student{name=" + name + ", age=" + age + "}";
    }
}
```

---

# アクセス制御

```java
    public String getName(){
        return name;
    }
```

例えば、先ほどのコードのメソッドには`public`がついています。<br>
これはアクセス修飾子といい、クラスやそのメンバーがどこから利用できるかを制御します。<br>
アクセス制御は、可視性ということもあります。

| アクセス修飾子   | 範囲                  | 
|-----------|---------------------| 
| private   | 同じクラス               | 
| 指定なし      | 同じパッケージ             | 
| public    | どこからでも              | 
| protected | 同じパッケージ、もしくは継承したクラス | 

---

# コンストラクタ

```java
    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }
```

オブジェクトを生成する際に呼び出されるメソッドをコンストラクタといいます。<br>
コンストラクタはクラス名と同じ名前で、戻り値を持ちません。<br>

## デフォルトコンストラクタ

コンストラクタを定義しない場合、デフォルトコンストラクタが自動的に生成されます。<br>
デフォルトコンストラクタは引数を持たず、フィールドの初期化を行いません。

---

# コンストラクタのオーバーロード

```java
    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }

    public Student(String name){
        this(name, 0);
    }
    
    public Student(){
        this("名無し");
    }
```

引数の数や型が異なるコンストラクタを複数定義することができます。<br>
これをコンストラクタのオーバーロードといいます。<br>
コンストラクタから別のコンストラクタを呼び出すこともできます。
その際には`this`を使います。

---

# thisについて

`this`はオブジェクト自身を指すキーワードです。<br>
`this`を使うことで、フィールドと引数の名前が同じ場合に区別することができます。

```java
    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }
```

引数とフィールドの名前が同じ場合、引数が優先されるため、`this`を使ってフィールドを指定しています。

---

# メソッド

```java
    public String getName(){
        return name;
    }

    public int getAge(){
        return age;
    }
```

メソッドはクラスの中で定義される実行の単位です。<br>
メソッドを呼び出していくことで、プログラムを実行していきます。

---

# インターフェース

    ```java
    public interface Animal{
        void eat();
        void sleep();
    }
    ```

インターフェースは、メソッドの宣言だけを持つことができます。<br>
インターフェースを実装するクラスは、インターフェースで宣言されたメソッドを実装しなければなりません。

---

# インターフェースの実装

```java
public class Dog implements Animal{
    @Override
    public void eat(){
        System.out.println("ビーフジャーキーを食べる");
    }

    @Override
    public void sleep(){
        System.out.println("ソファーの上で寝る");
    }
}
```

インターフェースを実装するクラスは、`implements`キーワードを使います。<br>
インターフェースで宣言されたメソッドを実装するためには、`@Override`アノテーションを使います。

---

# 公称型 (nominal type)について

例えば、`Dog`クラスは`Animal`インターフェースを実装しているため、`eat`メソッドと`sleep`メソッドを持っています。<br>

```java
public class Human{
    public void eat(){
        System.out.println("ご飯を食べる");
    }

    public void sleep(){
        System.out.println("ベッドで寝る");
    }
}
```

この`Human`クラスも`eat`メソッドと`sleep`メソッドを持っています。<br>
しかし、たとえメソッドの名前や引数の型が同じであっても、`Animal`インターフェースを実装していないため、`Animal`型として扱うことはできません。

---
