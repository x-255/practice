import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:flutter_demo/components/square.dart';
import 'dart:math' as math;

class TransformDemo extends StatelessWidget {
  const TransformDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _t1(),
        _t2(),
        _t3(),
      ]),
    );
  }

  Widget _item(Widget child) => Column(
        children: [
          DecoratedBox(
              decoration: BoxDecoration(color: Colors.blueGrey),
              //默认原点为左上角，左移20像素，向上平移5像素
              child: child),
          SizedBox(
            height: 50,
          )
        ],
      );

  Widget _child() => Text('Hello world');

  Widget _t1() => _item(Transform.translate(
        offset: Offset(50, 20),
        child: _child(),
      ));

  Widget _t2() => _item(Transform.rotate(
        angle: math.pi / 2,
        child: _child(),
      ));

  Widget _t3() => _item(Transform.scale(
        scale: 1.5,
        child: _child(),
      ));
}
