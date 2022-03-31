import 'dart:async';

T id<T>(T x) => x;

void printStream(Stream s) async {
  await for (var i in s) {
    print(i);
  }
}

final fu1 = Future.delayed(Duration(seconds: 2), () => 111);
final fu2 = Future.delayed(Duration(seconds: 1), () => 222);
final fu3 = Future.delayed(Duration(seconds: 1), () => Future.error('errr'));

// 单订阅流

void periodic() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  printStream(s);
}

void fromFuture() async {
  var s = Stream.fromFuture(fu1);
  printStream(s);
}

void fromFutures() async {
  var s = Stream.fromFutures([fu1, fu2]);
  printStream(s);
}

void fromIterable() async {
  var s = Stream.fromIterable([11, 22, 33]);
  printStream(s);
}

void value() async {
  var s = Stream.value(23123);
  printStream(s);
}

void forEach() async {
  var s = Stream.fromFutures([fu1, fu2]);
  s.forEach(print);
}

void listen() async {
  var s = Stream.fromFutures([fu1, fu3, fu2]);
  s.listen(
    print,
    cancelOnError: true,
    onDone: () => print('done'),
    onError: (err) => print('err====${err}'),
  );
}

void take() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(3);
  printStream(s);
}

void takeWhile() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.takeWhile((x) => x <= 3);
  printStream(s);
}

void skip() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(5);
  s = s.skip(2);
  printStream(s);
}

void skipWhile() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(5);
  s = s.skipWhile((x) {
    print('x====${x}');

    return x != 2;
  });
  printStream(s);
}

void main() {
  skipWhile();
}
