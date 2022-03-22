import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

class PointerEventDemo extends StatelessWidget {
  const PointerEventDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ValueBuilder<PointerEvent?>(
        initialValue: null,
        builder: (e, update) => Listener(
          child: Container(
            alignment: Alignment.center,
            width: 1.sw,
            height: .5.sh,
            color: Colors.cyan,
            child: Text(
              '${e?.localPosition ?? ''}',
              style: TextStyle(color: Colors.white),
            ),
          ),
          onPointerDown: update,
          onPointerMove: update,
          onPointerUp: update,
        ),
      ),
    );
  }
}
