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
  // 直到满足条件，前面的都跳过
  s = s.skipWhile((x) {
    return x < 2;
  });
  printStream(s);
}

void toList() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(3);
  var l = await s.toList();
  print(l);
}

void length() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(3);
  var l = await s.length;
  print(l);
}

void controller() async {
  final sc = StreamController();
  sc.add(1);
  sc.addError(2);
  sc.sink.add(3);
  sc.stream.listen(
    print,
    onError: (err) {
      print('err====${err}');
    },
    onDone: () {
      print('done');
    },
  );
}

void controllerStream() async {
  var s = Stream.periodic(Duration(seconds: 1), id);
  s = s.take(3);

  final sc = StreamController();
  sc.addStream(s);

  sc.stream.listen(
    print,
    onDone: () {
      print('done');
    },
  );
}

void controllerOn() async {
  final sc = StreamController(
    onListen: () => print('onListen'),
    onCancel: () => print('onCancel'),
    onPause: () => print('onPause'),
    onResume: () => print('onResume'),
  );

  StreamSubscription ss = sc.stream.listen(print);

  // 暂停
  ss.pause();

  // 恢复
  ss.resume();

  // 取消
  ss.cancel();

  // 关闭流
  sc.close();
}

void streamTransformer() async {
  var sc = StreamController<int>();

  // 创建 StreamTransformer对象
  var stf = StreamTransformer<int, double>.fromHandlers(
    handleData: (data, sink) {
      sink.add((data * 2).toDouble());
    },
    handleError: (error, stacktrace, sink) {
      sink.addError('wrong: $error');
    },
    handleDone: (sink) {
      sink.close();
    },
  );

  var s = sc.stream.transform(stf);

  s.listen(print);

  sc.add(1);
  sc.add(2);
  sc.add(3);
}

void main() {
  streamTransformer();
}
