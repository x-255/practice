import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CountDemo extends StatelessWidget {
  CountDemo({Key? key}) : super(key: key);

  final _c = Get.put(_C('xx'));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            TextButton(
              onPressed: () {
                _c.add();
              },
              child: GetBuilder<_C>(
                id: 'xx',
                init: _c,
                builder: (c) => Text('${_c.value}'),
              ),
            ),
            TextButton(
                onPressed: () {
                  Get.to(CountDemo2());
                },
                child: const Text('EEE'))
          ],
        ),
      ),
    );
  }
}

class CountDemo2 extends StatelessWidget {
  CountDemo2({Key? key}) : super(key: key);

  final _c = Get.put(_C('yy'));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: TextButton(
          onPressed: () {
            _c.add();
          },
          child: GetBuilder<_C>(
            id: 'yy',
            init: _c,
            builder: (c) => Text('${_c.value}'),
          ),
        ),
      ),
    );
  }
}

class _C extends GetxController {
  var value = 0.obs;
  final String _id;

  _C(this._id);

  void add() {
    value++;
    update([_id]);
  }
}

class CountDemo3 extends StatelessWidget {
  const CountDemo3({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CountDemo4(),
            CountDemo5(),
            ElevatedButton(
              child: const Text('demo6'),
              onPressed: () {
                Get.to(CountDemo6());
              },
            )
          ],
        ),
      ),
    );
  }
}

class CountDemo4 extends StatelessWidget {
  CountDemo4({Key? key}) : super(key: key);

  final _c = Get.put(_C1(), tag: 'demo4');

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Obx(() => Text('${_c.value}')),
      onPressed: () {
        _c.add();
      },
    );
  }
}

class CountDemo5 extends StatelessWidget {
  CountDemo5({Key? key}) : super(key: key);

  final _c = Get.put(_C1(), tag: 'demo5');

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Obx(() => Text('${_c.value}')),
      onPressed: () {
        _c.add();
      },
    );
  }
}

class CountDemo6 extends StatelessWidget {
  CountDemo6({Key? key}) : super(key: key);

  final _c = Get.find<_C1>(tag: 'demo5');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Obx(() => Text('${_c.value}'))),
    );
  }
}

class _C1 extends GetxController {
  var value = 0.obs;

  void add() {
    value++;
  }
}
