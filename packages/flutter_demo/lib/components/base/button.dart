import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';

class ButtonDemo extends StatelessWidget {
  const ButtonDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _btn1(),
        _btn2(),
        _btn3(),
        _btn4(),
      ]),
    );
  }

  Widget _btn1() => ElevatedButton(
        child: const Text('ElevatedButton'),
        onPressed: () {
          print('ElevatedButton');
        },
      );

  Widget _btn2() => TextButton(
        child: const Text('TextButton'),
        onPressed: () {
          print('TextButton');
        },
      );

  Widget _btn3() => OutlinedButton(
        child: const Text('OutlinedButton'),
        onPressed: () {
          print('OutlinedButton');
        },
      );

  Widget _btn4() => IconButton(
        icon: const Icon(Icons.ac_unit_outlined),
        onPressed: () {
          print('IconButton');
        },
      );
}
