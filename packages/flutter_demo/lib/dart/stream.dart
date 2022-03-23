import 'dart:async';

T id<T>(T x) => x;

final trace = (dynamic msg) => (dynamic val) => print('$msg===$val');

void periodic() async {
  var s = Stream.periodic(const Duration(seconds: 1), id);

  // 取消监听
  // s = s.take(3);
  s = s.takeWhile((element) => element < 5);

  // 跳过监听
  // s = s.skip(2);
  s = s.skipWhile((element) => element > 2);

  await for (var i in s) {
    print(i);
  }
  print('end');
}

void fromFuture() async {
  var fut = Future.delayed(const Duration(seconds: 1), () => 2);

  print(1);
  var s = Stream.fromFuture(fut);
  await for (var i in s) {
    print(i);
  }
  print(3);
}

void toList() async {
  var s = Stream.periodic(const Duration(milliseconds: 200), id);
  s = s.take(5);
  var data = await s.toList();
  print(data);
}

void controller() async {
  var sc = StreamController();
  sc.add(1);
  sc.add('2');
  sc.addError('errrrrrrrr');
  sc.add(3);

  sc.stream.listen(
    print,
    onDone: () => print('done'),
    onError: trace('err'),
  );
}

void streamController() async {
  var s = Stream.periodic(const Duration(seconds: 1), id);
  s = s.take(5);
  var sc = StreamController();
  sc.addStream(s);

  sc.stream.listen(
    print,
    onDone: () => print('done'),
    onError: trace('err'),
  );
}

void main() {
  // periodic();
  // fromFuture();
  // toList();
  // controller();
  streamController();
}
