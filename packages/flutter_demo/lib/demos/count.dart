import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
                child: Text('EEE'))
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
