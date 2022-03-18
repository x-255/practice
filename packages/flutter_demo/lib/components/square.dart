import 'package:flutter/material.dart';

class Square extends StatelessWidget {
  const Square(this.size, {Key? key, this.color = Colors.cyan, this.child})
      : super(key: key);

  final double size;
  final Widget? child;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      color: color,
      child: child,
    );
  }
}
