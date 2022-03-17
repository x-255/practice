import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flexCenter.dart';

class TextDemo extends StatelessWidget {
  const TextDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _spans(),
      ]),
    );
  }

  Widget _spans() {
    return const Text.rich(TextSpan(children: [
      TextSpan(text: '111', style: TextStyle(color: Colors.amber)),
      TextSpan(text: '222', style: TextStyle(color: Colors.indigoAccent)),
    ]));
  }
}
