---
title: Rust
permalink: rust
datePublished: 2026-04-14T10:49
dateUpdated: 2026-04-14T10:49
publish: true
---

[Rust](https://github.com/rust-lang/rust) est un langage de programmation.

C'est un langage de bas niveau qui peut être utilisé comme un langage de haut niveau sans devoir allouer et libérer la mémoire manuellement.

C'est un langage compilé.

## Installation

```bash
sudo pacman -S rust
```

## Faire un println

> [!QUOTE]
> Le symbole `!` après `println` indique qu'il s'agit d'une macro

```rust
println!("Hello John!");
// Ou
let name = "John";
println!("Hello {name}!");
// Ou
let name = "John";
println!("Hello {}!", name);
```

## Debugger avec println

```rust
let myvar = 1;
println!("{:?}", myvar);
// Ou
println!("{myvar:?}");
// Ou
println!("{:#?}", myvar);
// Ou
println!("{myvar:#?}");
```

Il existe aussi la macro `dbg!` :

```rust
let myvar = 1;
dbg!(myvar);
```

## Créer une variable

> [!NOTE]
> Les variables utilisent une convention de nommage en snake_case (ex: my_variable).

> [!NOTE]
> Par défaut, une variable est immutable.

```rust
let myvar = 1;
```

## Créer une variable mutable

```rust
let mut myvar = 1;
myvar = 2;
```

## Créer une variable vide

```rust
let myvar = String::new();
```

## Créer une variable typée (Data Types)

```rust
let myvar: i32 = 1; // integer
let myvar: f64 = 1.0; // float
let myvar: char = 'a'; // character
let myvar: bool = true; // boolean
let myvar: &str = "Hello"; // string slice
let myvar: [i32; 4] = [1, 2, 3, 4]; // array
let myvar: String = String::from("Hello"); // string
```

## Créer une constante

```rust
const MYVAR: i32 = 1;
```

## Créer une fonction

```rust
fn main() {
    println!("Hello, world!");
}
```

## Créer une fonction avec des paramètres

```rust
fn say_hello(name: String) {
    println!("Hello, {name}!");
}
```

## Créer une fonction qui retourne une valeur

```rust
fn add(a: i32, b: i32) -> i32 {
    return a + b; // Ou `a + b` sans le `return` et le point-virgule
}
```

## Créer une fonction qui ne retourne rien

```rust
fn say_hello(name: String) {
    () // Retourne une valeur vide (unit type)
}
```

## Convertir un string slice en String

```rust
let myvar: &str = "Hello";
let myvar2: String = myvar.to_string();
// Ou
let myvar2: String = String::from(myvar);
// Ou
let myvar2: String = myvar.to_owned();
```

## Convertir un String en string slice

```rust
let myvar: String = String::from("Hello");
let myvar2: &str = &myvar;
```

## Faire un slice (récupérer une partie d'un array)

```rust
let myvar = [1, 2, 3];
let slice = &myvar[0..2]; // slice de 0 à 2 (exclu)
```

## Faire une déstructuration

```rust
let cat = ("Furry McFurson", 3.5);
let (name, age) = cat;
println!("{name} is {age} years old");
```

## Créer un vecteur (vector)

Un vector est une collection de valeurs **de même type**, mais de taille dynamique.

```rust
let mut myvec = Vec::new();
myvec.push(1);
myvec.push(2);
myvec.push(3);

// Ou

let myvec = vec![1, 2, 3]; // Utilisation de la macro vec!

// Ou

let myvec = Vec::from([1, 2, 3]);
```

Il est possible d'exécuter d'autres fonctions :

```rust
myvec.len(); // Longueur du vector
myvec.pop(); // Supprimer le dernier élément du vector
```

Pour récupérer une valeur d'un vector, on peut utiliser l'index :

```rust
let element = myvec[2]; // Récupérer le troisième élément du vector
```

Pour afficher tous les éléments d'un vector, on peut faire une boucle for :

```rust
for element in myvec {
    println!("{element}");
}
```

Pour spécifier le type d'un vector, on peut faire :

```rust
let myvec: Vec<i32> = Vec::new();
```

L'annotation `Vec<i32>` (type annotation) indique que le vector contient une liste d'entiers de type `i32`.

## Tuples

Un tuple est une collection de valeurs de types différents, de taille fixe.

Il est représenté par des parenthèses `()`.

```rust
let mytuple = (1, "hello", true);
let (a, b, c) = mytuple; // Destructuring
println!("a: {a}, b: {b}, c: {c}");
println!("{}", mytuple.1);
```

Si un tuple contient trop de valeurs, il vaut mieux utiliser un struct.

## Créer un hashmap

```rust
use std::collections::HashMap;

let mut myhashmap = HashMap::new();
myhashmap.insert("key1", "value1");
myhashmap.insert("key2", "value2");
myhashmap.insert("key3", "value3");
```

## Récupérer une valeur d'un hashmap

```rust
let value = myhashmap.get("key1");
```

## Récupérer les valeurs d'un hashmap

```rust
for value in myhashmap.values() {
    println!("value: {value}");
}
```

## Récupérer les clés d'un hashmap

```rust
for key in myhashmap.keys() {
    println!("key: {key}");
}
```

## Supprimer une clé d'un hashmap

```rust
myhashmap.remove("key2");
```

## Vérifier si une clé existe dans un hashmap

```rust
if myhashmap.contains_key("key1") {
    println!("key1 exists in the hashmap");
}
```

## Faire un iter sur un hashmap

```rust
for (key, value) in myhashmap.iter() {
    println!("key: {key}, value: {value}");
}
```

## Créer une boucle for

```rust
for i in 0..5 {
    println!("i: {i}");
}
```

## Faire un map

```rust
let myvec = vec![1, 2, 3];
let myvec2: Vec<i32> = myvec.iter().map(|x| x * 2).collect();
println!("{:?}", myvec2); // Affiche [2, 4, 6]
```

## Créer un clone

```rust
let myvar = String::from("Hello");
let myvar2 = myvar.clone();
```

## Lire un input

```rust
println!("Please enter some input: ");
let mut input = String::new();
std::io::stdin().read_line(&mut input);
println!("You entered: {input}");
```

## Quitter le programme

```rust
std::process::exit(0);
```

## Créer une boucle

Créer une boucle infinie :

```rust
loop {
    println!("Hello world!");
}
```

Créer une boucle avec une condition :

```rust
while myvar < 5 {
    println!("{myvar}");
    myvar += 1;
}
```

Elles peuvent être interrompues avec `break` ou `continue`.

## Faire une condition

```rust
if myvar > 1 {
    println!("myvar is greater than 1");
} else if myvar == 1 {
    println!("myvar is equal to 1");
} else {
    println!("myvar is less than 1");
}
```

## Shadowing

```rust
let myvar = "one";
let myvar = 1; // Shadowing
println!("myvar: {}", myvar); // Affiche 1
```

## Enum

Enum permet de créer un type de donnée (Data Type) personnalisé.

Par exemple, on peut créer un type de donnée `Direction` :

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

let my_direction = Direction::Up;
```

Contrairement à un struct, un enum ne peut avoir qu'une seule valeur à la fois.

## Enum avec des valeurs

```rust
enum Direction {
    Up(i32),
    Down(i32),
    Left(i32),
    Right(i32),
}

let my_direction = Direction::Up(10);
```

## Struct

Struct permet aussi de créer un type de donnée (Data Type) personnalisé.

Par exemple, on peut créer un type de donnée `User` :

```rust
struct User {
    name: String,
    age: i32,
}

let User { name, age } = User {
    name: String::from("John"),
    age: 30,
};

println!("{name} is {age} years old.");
```

Contrairement à un enum, un struct peut avoir plusieurs valeurs à la fois.

## Spread operator

```rust
let user2 = User {
    name: String::from("Bob"),
    ..user1 // Spread operator
};
```

## Match

Match est équivalent à un switch en JavaScript.

C'est pareil qu'un if-else, mais plus puissant.

```rust
let myvar = 1;
match myvar {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("other"),
}
```

Il peut aussi stocker la valeur dans une variable :

```rust
let myvar = 1;
let result = match myvar {
    1 => "one",
    2 => "two",
    _ => "other",
};
println!("result: {result}");
```

## Format

```rust
fn format_name(name: &str) -> String {
    format!("Hello, {name}!")
}
```

## Rendre une fonction publique

```rust
pub fn my_function() {
    // ...
}
```

## Créer un module

```rust
mod my_module {
    pub fn my_function() {
        // ...
    }
}

my_module::my_function();
// Ou
use my_module::*;
my_function();
```

## Importer un module

```rust
mod my_module;
use super::my_module::my_function; // go up one level
use crate::my_module::my_function; // start from the top
use my_module as myalias; // alias
```

## Importer un module standard

```rust
use std::fs;
use std::io;
// Ou
use std::{fs, io};
```

## Gestion des erreurs avec Result

Result est un type de retour qui peut être soit `Ok` (succès) ou `Err` (erreur).

C'est utile pour les fonctions qui peuvent potentiellement échouer.

Le retour est un i32 si la fonction réussit, ou un String si la fonction échoue.

C'est l'équivalent des promises et try/catch en JavaScript.

La syntaxe `Result<i32, String>` indique que la fonction peut retourner 2 variants : `Ok(i32)` ou `Err(String)`.

La fonction peut retourner soit l'un soit l'autre.

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err(String::from("Cannot divide by zero"));
    }
    Ok(a / b)
}

let result = divide(10, 2);
match result {
    Ok(value) => println!("Result: {value}"),
    Err(error) => println!("Error: {error}"),
}
```

Il y a un raccourci avec le question mark `?` qui permet de propager l'erreur à la fonction appelante.

Cela évite de faire un match.

```rust
let result = divide(10, 2)?;
// match result {
    // Ok(value) => println!("Result: {value}"),
    // Err(error) => return Err(error),
// }
println!("Result: {result}");
Ok(())
```

## Unwrap

`unwrap` est une méthode qui permet de récupérer la valeur d'un `Result`.

```rust
let result = divide(10, 2);
let value = result.unwrap(); // value = 5
```

> [!NOTE]
> Éviter les fonctions qui paniquent comme `unwrap()`, préférer les mécanismes comme `?` pour propager les erreurs.

## Possession / Ownership

En Rust, chaque fonction libère la mémoire de ses variables à la fin de son exécution (drop).

Le propriétaire initial de la variable my_var est la fonction main.

La variable my_var a été déplacée dans la fonction my_function qui devient le nouveau propriétaire.

Et elle est libérée à la fin de l'exécution de la fonction my_function.

Elle n'est donc plus accessible dans la fonction main, ce qui provoque une erreur.

Chaque propriétaire est responsable de vider la mémoire.

```rust
fn my_function(myparam: String) {
    println!("myparam: {myparam}");
}

fn main() {
    let my_var = String::from("Hello");
    my_function(my_var);
    println!("myvar: {my_var}"); // Erreur : myvar a été déplacé dans la fonction
}
```

Dans l'exemple ci-dessous, la variable a est déplacée (move) dans la variable b.

Le propriétaire de la variable a devient la variable b.

Cela provoque une erreur car la variable n'est plus accessible après avoir été déplacée dans b.

```rust
fn main() {
    let a = String::from("Hello");
    let b = a;
    println!("{a}"); // Erreur : a a été déplacée dans b
}
```

## Emprunt / Borrowing

Pour éviter l'erreur de propriété (borrowing), on peut emprunter la variable au lieu de la déplacer.

La variable my_var est empruntée par la fonction my_function au lieu de la déplacer.

Le symbole `&` indique que la variable est empruntée. Il s'agit d'une référence (reference).

La fonction main reste le propriétaire de la variable my_var.

```rust
fn my_function(myparam: &String) {
    println!("myparam: {myparam}");
}

fn main() {
    let my_var = String::from("Hello");
    my_function(&my_var); // Emprunt de my_var
    println!("myvar: {my_var}"); // my_var est toujours accessible
}
```

Un autre exemple, la variable my_numbers est empruntée par la boucle for au lieu de la déplacer dans la boucle for.

Elle peut ainsi être utilisée après la boucle for pour afficher sa longueur (len).

Sans la référence `&`, la variable my_numbers serait déplacée dans la boucle for et ne serait plus accessible après la boucle for, ce qui provoquerait une erreur.

```rust
fn main() {
    let my_numbers = vec![10, 20, 30, 40];

    for num in &my_numbers {
        match num {
            30 => println!("thirty"),
            _ => println!("{num}"),
        }
    }

    println!("Total {}", my_numbers.len());
}
```

Ces concepts de possession et d'emprunt permettent d'éviter des fuites de mémoire (memory leaks).

## Impl

Le mot-clé `impl` permet d'implémenter des méthodes pour un struct ou un enum.

C'est l'équivalent d'une classe en JavaScript.

```rust
struct User {
    name: String,
}

impl User {
    fn say_hello(&self) {
        println!("Hello, my name is {}", self.name);
    }

    fn change_name(&mut self) {
        self.name = String::from("Bob");
    }
}

fn main() {
    let mut user = User {
        name: String::from("John"),
    };

    user.say_hello(); // Affiche "Hello, my name is John"
    user.change_name();
    user.say_hello(); // Affiche "Hello, my name is Bob"
}
```

## Derives

```rust
#[derive(Debug)]
struct User {
    name: String,
}

fn main() {
    let user = User {
        name: String::from("John"),
    };

    println!("{:?}", user); // Affiche "User { name: "John" }"
}
```

Il existe aussi d'autres derives comme `Clone`, `Copy`.

## Traits

Un trait permet de définir une seule fonction pour plusieurs types de données.

Une manière se standardiser un comportement que l'on peut appliquer sur plusieurs types de données.

C'est l'équivalent d'une interface en PHP.

Cela permet d'avoir une seule fonction (ex: `log`) plutôt que plusieurs fonctions (ex: `log_phone` et `log_email`).

Sans trait, la logique est dupliquée pour chaque type :

```rust
struct Phone;
struct Email;

impl Phone { fn notify(&self) { println!("SMS"); } }
impl Email { fn notify(&self) { println!("Email"); } }

// Logique dupliquée pour chaque type
fn log_phone(p: &Phone) { println!("LOG:"); p.notify(); }
fn log_email(e: &Email) { println!("LOG:"); e.notify(); }

fn main() {
    log_phone(&Phone);
    log_email(&Email);
}
```

Avec trait, une seule fonction suffit pour tous les types qui implémentent `Notify` :

```rust
trait Notify { fn notify(&self); }

struct Phone;
struct Email;

impl Notify for Phone { fn notify(&self) { println!("SMS"); } }
impl Notify for Email { fn notify(&self) { println!("Email"); } }

// Une seule fonction pour tous les types
fn log(n: &impl Notify) { println!("LOG:"); n.notify(); }

fn main() {
    log(&Phone);
    log(&Email);
}
```

## Option

Option est un type de donnée qui peut être soit `Some` (valeur présente) ou `None` (valeur absente).

Cela permet de gérer les valeurs nulles (null).

C'est un type de donnée optionnel.

```rust
struct User {
    name: String,
    age: Option<i32>,
}

fn main() {
    let user1 = User {
        name: String::from("John"),
        age: Some(30),
    };

    let user2 = User {
        name: String::from("Bob"),
        age: None,
    };
}
```

Les types `Option` ont des méthodes `is_some` et `is_none` pour vérifier si la valeur est présente ou absente.

## Closure

Une closure est simplement une fonction anonyme.

C'est une fonction sans nom qui est définie avec des barres verticales `|` au lieu des parenthèses `()`.

```rust
fn main() {
    // ou `let add = |a, b| a + b;`
    let add = |a: i32, b: i32| -> i32 {
        return a + b;
    };

    let result = add(10, 20);
    println!("Result: {result}"); // Affiche "Result: 30"
}
```

## Passer une closure dans une fonction

```rust
fn math(a: i32, b: i32, op: impl Fn(i32, i32) -> i32) -> i32 {
    op(a, b)
}

fn main() {
    let add = |a, b| {
        println!("Hello world");
        a + b
    };
    println!("{}", math(2, 2, add));
}
```

## Map

```rust
let myvec = vec![1, 2, 3];
let myvec2 = myvec.iter().map(|x| x * 2);
```

## Sleep

Attendre pendant 1 seconde :

```rust
thread::sleep(Duration::from_secs(1));
```

## Iterator

```rust
let myvec = vec![1, 2, 3, 4, 5];
let myvec2: Vec<_> = myvec.iter().map(|num| num + 1).collect();
// Ou
let myvec2: Vec<_> = myvec.iter().filter(|&&num| num <= 2).collect();
// Ou
let myvec2: Option<&&i32> = myvec.iter().find(|&&num| num == 2);
// Ou
let count = myvec.iter().count();
// Ou
let last: Option<&i32> = myvec.iter().last();
```

## Range

```rust
let range = 1..=3; // 1, 2, 3
// Ou
let range = 1..3; // 1, 2
```

## Testing

```rust
fn all_caps(word: &str) -> String {
    word.to_uppercase()
}

#[cfg(test)]
mod test {
    use crate::*;
    #[test]
    fn check_all_caps() {
        let result = all_caps("hello");
        let expected = String::from("HELLO");
        assert_eq!(result, expected, "string should be all uppercase");
    }
}
```

## Crates / Packages / Librairies

Il existe 2 sites pour accéder aux crates :

- https://crates.io/
- https://lib.rs/

Pour installer un crate :

```bash
cargo add <crate>
# Exemple
cargo add humantime
```

Pour utiliser le crate :

```rust
use std::time::Duration;
use humantime::format_duration; // importation

fn main() {
    let d = Duration::from_secs(999);
    println!("{}", format_duration(d)); // utilisation
}
```

## Autres concepts

- Generics
- Lifetimes
- Buffer
- Heap
- Stack
- If let
- While let
- Async
- Unsafe

## Exemples de packages

- https://github.com/clap-rs/clap
- https://github.com/notify-rs/notify
- https://github.com/longbridge/gpui-component

## Exemples de projets Rust

- https://github.com/christo-auer/eilmeldung
- https://github.com/matthart1983/netwatch
- https://github.com/obdev/littlesnitch-linux
- https://github.com/rgwood/systemctl-tui
- https://github.com/zed-industries/zed/
- https://github.com/erikjuhani/basalt/
- https://github.com/hrkfdn/ncspot
- https://github.com/sharkdp/fd

## Apprendre Rust

- https://tourofrust.com
- https://roadmap.sh/rust
- https://quickref.me/rust
- https://practice.course.rs
- https://rust-exercises.com
- https://rust-lang.org/learn/
- https://rustlings.rust-lang.org/
- https://doc.rust-lang.org/book/
- https://rustadventure.dev/
- https://programiz.com/rust
- https://dev.letsgetrusty.com
- https://jrvidal.github.io/explaine.rs/
- https://learnxinyminutes.com/fr/rust/
- https://blog.guillaume-gomez.fr/Rust/
- https://app.codecrafters.io/tracks/rust
- https://product.letsgetrusty.com/bootcamp
- https://github.com/sunface/rust-by-practice
- https://github.com/rust-lang/rust-by-example
- https://zerotomastery.io/courses/learn-rust/
- https://doc.rust-lang.org/stable/std/index.html
- https://github.com/google/comprehensive-rust
- https://zerotomastery.io/cheatsheets/rust-cheat-sheet/
- https://egghead.io/courses/write-your-first-program-with-the-rust-language
- https://egghead.io/courses/learning-rust-by-solving-the-rustlings-exercises-a722

---

Références :

- [Fireship - Rust in 100 Seconds](https://youtu.be/5C_HPTJg5ek)
- [Loïc Rust - L'Ownership en Rust](https://youtu.be/NxQNZ0eYk2w)
- [Eddie Gerbais-Nief - Apprendre le RUST partie #1 FR](https://youtu.be/mZasv3__A9k)
- [BekBrace - Rust Programming Full Course  | Learn in 2024](https://youtu.be/rQ_J9WH6CGk)
- [freeCodeCamp.org - Learn Rust Programming - Complete Course](https://youtu.be/BpPEoZW5IiY)