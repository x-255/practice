import 'dart:async';

T id<T>(T x) => x;

void printStream(Stream s) async {
  await for (var i in s) {
    print(i);
  }
}

final fu1 = Future.delayed(Duration(seconds: 1), () => 111);
final fu2 = Future.delayed(Duration(seconds: 1), () => 222);

// 单订阅流

void periodic() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  printStream(s);
}

void fromFuture() async {
  var s = Stream.fromFuture(fu1);
  printStream(s);
}

void main() {
  // periodic();
  fromFuture();
}
