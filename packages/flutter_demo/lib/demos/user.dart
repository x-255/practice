import 'package:flutter/material.dart';
import 'package:get/get.dart';

class _User {
  var name = 'xxx';
  var age = 11;
}

class _C extends GetxController {
  static _C get to => Get.find();

  var user = _User().obs;

  void addAge() {
    /* user.update((val) {
      val!.age++;
    }); */

    user.value.age++;

    update();
  }
}

class UserDemo extends StatelessWidget {
  const UserDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: TextButton(
          child: GetBuilder<_C>(
            init: _C(),
            builder: (c) => TextButton(
              child: Text('age: ${c.user.value.age}'),
              onPressed: () {
                c.addAge();
              },
            ),
          ),
          onPressed: () {
            _C.to.addAge();
          },
        ),
      ),
    );
  }
}
