import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';

class IconDemo extends StatelessWidget {
  const IconDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: FlexCenter([
        Icon(
          Icons.accessibility_new_rounded,
          color: Colors.green,
        ),
        SizedBox(
          height: 20,
        ),
        Icon(
          MyIcons.qrcode,
          color: Colors.amber,
        ),
        SizedBox(
          height: 20,
        ),
        Icon(
          MyIcons.svg,
          color: Colors.orangeAccent,
          size: 50,
        )
      ]),
    );
  }
}

class MyIcons {
  static const qrcode =
      IconData(0xe7ae, fontFamily: 'MyIcon', matchTextDirection: true);
  static const svg =
      IconData(0xe60c, fontFamily: 'MyIcon', matchTextDirection: true);
}
