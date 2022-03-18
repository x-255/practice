import 'package:flutter/material.dart';
import 'package:flutter_demo/components/square.dart';

class StackDemo extends StatelessWidget {
  const StackDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ConstrainedBox(
        constraints: const BoxConstraints.expand(),
        child: Stack(
          alignment: Alignment.center,
          fit: StackFit.expand,
          children: [
            const Positioned(
              left: 20,
              child: Text('left'),
            ),
            Container(
              color: Colors.cyan,
              child: const Text('nononon'),
            ),
            const Positioned(
              top: 20,
              child: Text('top'),
            ),
          ],
        ),
      ),
    );
  }
}

class AlignDemo extends StatelessWidget {
  const AlignDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        Container(
          width: 50,
          height: 50,
          color: Colors.amber,
          child: const Align(
            alignment: FractionalOffset(.5, 1),
            child: Square(20),
          ),
        ),
        Container(
          color: Colors.amber,
          child: const Align(
            widthFactor: 2,
            heightFactor: 3,
            alignment: Alignment.topRight,
            child: Square(20),
          ),
        ),
      ],
    )));
  }
}
