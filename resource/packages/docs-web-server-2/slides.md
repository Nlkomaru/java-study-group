---
theme: ../theme-modern
download: true
---

# JavaでのWebアプリケーション開発 2

---

# 目次

<Toc maxDepth="1"></Toc>

---

# 前回の振り返り

前回は、Spring Bootを使ってWebアプリケーションを開発する方法を学びました。

---

# GraalVM

GraalVMは、Oracleが開発しているJVMの実装です。

GraalVMは、高パフォーマンスなJITコンパイラを持っており、Javaアプリケーションの実行速度を向上させることができます。
また、JVM以外にも、native image utilityを使って、Javaアプリケーションをネイティブバイナリにコンパイルすることができます。
これによって 、Javaアプリケーションの起動時間を短縮することができます。

---

# ガベージコレクション

G1GCは、Java 9からデフォルトのガベージコレクタで、ユーザーが提供する目標時間内にガベージコレクションを行うことができます。

ZGCは、極力停止時間を発生しないように設計されたガベージコレクタです。

---

# 他のJVM言語

KotlinやScalaなどのJVM言語も、Javaと同じくJVM上で動作するため、Javaと同じようにWebアプリケーションを開発することができます。

## Kotlin

JetBrainsが開発しているプログラミング言語で、Javaとの互換性が高く、100% Javaとの相互運用が可能です。
Null安全性や拡張関数など、Javaにはない機能を持っています。

## Scala

Martin Oderskyが開発しているプログラミング言語で、Javaとの互換性が高く、Javaとの相互運用が可能です。
関数型プログラミング言語で、Javaにはない機能を持っています。

---

# SOLID原則

SOLID原則は、オブジェクト指向プログラミングの設計原則の一つです。

- 単一責任の原則(Single Responsibility Principle)
- オープン・クローズドの原則(Open/Closed Principle)
- リスコフの置換原則(Liskov Substitution Principle)
- インターフェース分離の原則(Interface Segregation Principle)
- 依存性逆転の原則(Dependency Inversion Principle)

---

# 単一責任の原則(Single Responsibility Principle)

単一責任の原則は、クラスは1つの責務を持つべきであるという原則です。

クラスが複数の責務を持つと、変更が発生した際に、他の責務に影響を与える可能性があります。

---

# オープン・クローズドの原則(Open/Closed Principle)

オープン・クローズドの原則は、クラスは拡張に対して開かれ、修正に対して閉じられているべきであるという原則です。

新しい機能を追加する際に、既存のコードを変更することなく、新しい機能を追加できるようにすることが重要です。

---

# リスコフの置換原則(Liskov Substitution Principle)

リスコフの置換原則は、スーパークラスのオブジェクトをサブクラスのオブジェクトで置き換えても、プログラムの振る舞いが変わず、
置換可能であるべきという原則です。

TはSのサブタイプであるならば、S型のオブジェクトをT型のオブジェクトで置き換えても、プログラムの振る舞いが変わらないべきである。

---

# インターフェース分離の原則(Interface Segregation Principle)

インターフェース分離の原則は、クライアントが利用しないメソッドに依存しないようにするための原則です。

インターフェースを細かく分割することで、クライアントが利用しないメソッドに依存しないようにすることができます。

---

# 依存性逆転の原則(Dependency Inversion Principle)

依存性逆転の原則は、上位モジュールは下位モジュールに依存してはならず、どちらも抽象に依存すべきであるという原則です。

具体的な実装に依存するのではなく、抽象に依存することで、コンポーネント間の結合度を低くし、テストしやすいコードを書くことができます。

---

# 依存性の注入

依存性の注入は、オブジェクト間の依存関係を外部から注入することで、コンポーネント間の結合度を低くし、テストしやすいコードを書くことができます。

依存性の注入の方法として、コンストラクタを使ったもの、DIコンテナを使ったものなどがあります。

---

# DIコンテナ

DIコンテナは、依存性の注入を行うためのフレームワークです。

Spring Frameworkには、DIコンテナが組み込まれており、DIコンテナを使って、依存性の注入を行うことができます。

そのほかにも、Google GuiceやDaggerなどのDIコンテナがあります。

依存性注入を使うことで、コンポーネント間の結合度を低くし、テストしやすいコードを書くことができます。

---

# 参考文献

1. [GraalVM](https://www.graalvm.org/)
2. [JDKの超高速な新ガベージ・コレクタを理解する](https://blogs.oracle.com/otnjp/post/understanding-the-jdks-new-superfast-garbage-collectors-ja)
3. [Kotlin](https://kotlinlang.org/)
4. [Scala](https://www.scala-lang.org/)
5. [Clean Architecture 達人に学ぶソフトウェアの構造と設計](https://tatsu-zine.com/books/clean-architecture)