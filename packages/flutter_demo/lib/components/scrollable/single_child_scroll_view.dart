import 'package:flutter/material.dart';

class SingleChildScrollViewDemo extends StatelessWidget {
  const SingleChildScrollViewDemo({Key? key}) : super(key: key);

  final str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Scrollbar(
        child: SingleChildScrollView(
          child: Center(
            child: Column(
              children: str
                  .split('')
                  .map((e) => Text(
                        e,
                        textScaleFactor: 2,
                      ))
                  .toList(),
            ),
          ),
        ),
      ),
    );
  }
}
