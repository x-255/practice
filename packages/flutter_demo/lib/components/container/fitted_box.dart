import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FittedBoxDemo extends StatelessWidget {
  const FittedBoxDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter(
        [
          wRow(' 01234567890123456789 '),
          SingleLineFittedBox(child: wRow(' 01234567890123456789 ')),
          wRow(' 800 '),
          SingleLineFittedBox(child: wRow(' 800 ')),
        ]
            .map((e) => Padding(
                  padding: EdgeInsets.symmetric(vertical: 20),
                  child: e,
                ))
            .toList(),
      ),
    );
  }

  Widget wRow(String text) {
    Widget child = Text(text);
    child = Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [child, child, child],
    );
    return child;
  }
}

class SingleLineFittedBox extends StatelessWidget {
  final Widget? child;

  const SingleLineFittedBox({Key? key, this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return FittedBox(
          child: ConstrainedBox(
            constraints: constraints.copyWith(
                minWidth: constraints.maxWidth, maxWidth: double.infinity),
            child: child,
          ),
        );
      },
    );
  }
}
