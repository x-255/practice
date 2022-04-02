import 'package:flutter/material.dart';

class Hoc1 extends StatelessWidget {
  const Hoc1({Key? key}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return Center(
      child: Example(
        display: ({required final String text}) {
          return MyTextWidget(text: text);
        },
        text: "some text",
      ),
    );
  }
}

class MyTextWidget extends StatelessWidget {
  final String text;

  const MyTextWidget({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(final BuildContext context) {
    return Text(text);
  }
}

typedef DisplayType = Widget Function({required String text});

class Example extends StatelessWidget {
  final DisplayType display;
  final String text;

  const Example({
    required this.display,
    required this.text,
  });

  @override
  Widget build(final BuildContext context) {
    return display(text: text);
  }
}
