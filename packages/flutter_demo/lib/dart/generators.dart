Iterable<int> gen1() sync* {
  int k = 0;
  while (k < 5) {
    yield k++;
  }
}

Stream<int> gen2() async* {
  int k = 0;
  while (k < 5) {
    yield k++;
  }
}

Iterable<int> gen3(int k) sync* {
  yield k;
  if (k < 5) {
    yield* gen3(++k);
  }
}

void main() async {
  var l = gen3(0);
  print(l);
}
