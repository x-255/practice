import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:get/get.dart';

class ProgressDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _p1(),
        _spaceRow(),
        _p2(),
        _spaceRow(),
        _p3(),
        _spaceRow(),
        _p4(),
      ]),
    );
  }

  Widget _spaceRow() => SizedBox(height: 20);

  Widget _p1() => LinearProgressIndicator();

  Widget _p2() => ValueBuilder<double>(
      initialValue: .4,
      builder: (value, updater) => Column(
            children: [
              LinearProgressIndicator(
                value: value,
              ),
              IconButton(
                icon: Icon(Icons.add),
                onPressed: () {
                  if (value < 1) {
                    updater(value + .2);
                    print(value);
                  }
                },
              )
            ],
          ));

  Widget _p3() => CircularProgressIndicator();

  Widget _p4() => ValueBuilder<double>(
      initialValue: .2,
      builder: (value, updater) => Column(
            children: [
              CircularProgressIndicator(
                value: value,
              ),
              IconButton(
                icon: Icon(Icons.add),
                onPressed: () {
                  if (value < 1) {
                    updater(value + .2);
                    print(value);
                  }
                },
              )
            ],
          ));
}
