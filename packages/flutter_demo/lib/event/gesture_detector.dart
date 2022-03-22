import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GestureDetectorDemo extends StatelessWidget {
  const GestureDetectorDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _Scale(),
    );
  }
}

class _Con extends GetxController {
  var top = .0.obs;
  var left = .0.obs;

  void addTop(double n) {
    top(top.value + n);
  }

  void addLeft(double n) {
    left(left.value + n);
  }
}

class _Move extends StatelessWidget {
  _Move({Key? key}) : super(key: key);

  final con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Obx(() => Positioned(
              top: con.top.value,
              left: con.left.value,
              child: GestureDetector(
                child: const CircleAvatar(child: Text('M')),
                onPanDown: (e) {
                  print('用户手指按下：${e.globalPosition}');
                },
                onPanUpdate: (e) {
                  con.addTop(e.delta.dy);
                  con.addLeft(e.delta.dx);
                },
                onPanEnd: (e) {
                  print('移动速度：${e.velocity}');
                },
              ),
            ))
      ],
    );
  }
}

class _Scale extends StatelessWidget {
  const _Scale({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ValueBuilder<double>(
        initialValue: 50,
        builder: (width, update) => GestureDetector(
          child: Image.network(
            'https://picsum.photos/id/1049/800/800',
            width: width,
            fit: BoxFit.fitWidth,
          ),
          onScaleUpdate: (e) {
            print(e.scale);
            update(200 * e.scale);
          },
        ),
      ),
    );
  }
}
