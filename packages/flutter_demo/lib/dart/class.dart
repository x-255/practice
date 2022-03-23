class Parent {
  int x;
  int y;

  //父类命名构造函数不会传递
  Parent.fromJson(this.x, this.y) {
    print('父类命名构造函数');
  }
}

class Child extends Parent {
  Child(x, y) : super.fromJson(x, y) {
    print('子类构造函数 $this');
  }
}

class Singleton {
  int x;
  static Singleton? _cache;

  Singleton._new(this.x);

  factory Singleton(int _x) => _cache ??= Singleton._new(_x);
}

class Meta {
  void run() {
    print('run');
  }

  @override
  noSuchMethod(Invocation invocation) {
    return invocation.isMethod ? run() : '404';
  }
}

class User {
  int id;
  int age;

  User(this.id, [this.age = 1]);

  @override
  String toString() => 'User: { id: $id, age: $age }';

  User operator +(int x) => User(id, age + x);

  @override
  operator ==(user2) => user2 is User && id == user2.id;

  @override
  int get hashCode => id;
}

void main() {
  /* var f = true;
  var arr = [1, 2, 3, if (f) 4, for (var i = 5; i < 10; i++) i];
  print(arr); */

  /* print((Meta() as dynamic).run2); */

  var u1 = User(1, 1);
  var u2 = User(2, 2);
  var u3 = User(1, 3);
  print(u1);
  print(u2 + 8);
  print(u1 == u3);
}
