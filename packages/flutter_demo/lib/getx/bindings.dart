import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:flutter_demo/router/router.dart';
import 'package:get/get.dart';

class BindingDemo extends StatelessWidget {
  const BindingDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: TextButton(
        child: const Text('demo1'),
        onPressed: () {
          Get.toNamed(Routes.bind1);
        },
      )),
    );
  }
}

class BindingDemo1 extends StatelessWidget {
  BindingDemo1({Key? key}) : super(key: key);

  final _c = Get.find<BindingController1>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        Text(_c.name),
        TextButton(
          child: const Text('demo2'),
          onPressed: () {
            Get.toNamed(Routes.bind2);
          },
        ),
        TextButton(
          child: const Text('get con2'),
          onPressed: () {
            final c2 = Get.find<BindingController2>();

            print(c2);
          },
        )
      ]),
    );
  }
}

class BindingDemo2 extends StatelessWidget {
  BindingDemo2({Key? key}) : super(key: key);

  final _c = Get.find<BindingController2>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text(_c.name)),
    );
  }
}

class BindingController1 extends GetxController {
  final name = '111';
}

class BindingController2 extends GetxController {
  final name = '222';

  @override
  void onInit() {
    print('init');
    super.onInit();
  }

  @override
  void onClose() {
    print('close');
    super.onClose();
  }
}
