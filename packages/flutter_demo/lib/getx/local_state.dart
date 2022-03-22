import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:get/get.dart';

class LocalState extends StatelessWidget {
  const LocalState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const _ValueBuilder();
  }
}

class _ValueBuilder extends StatelessWidget {
  const _ValueBuilder({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        ValueBuilder<bool>(
          initialValue: false,
          builder: (value, updateFn) =>
              Switch(value: value, onChanged: updateFn),
          onUpdate: (value) => print("Value updated: $value"),
          onDispose: () => print("Widget unmounted"),
        ),
        ElevatedButton(
          child: const Text('obv'),
          onPressed: () {
            Get.to(const _ObxValue());
          },
        )
      ]),
    );
  }
}

class _ObxValue extends StatelessWidget {
  const _ObxValue({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: ObxValue<RxInt>(
              (count) => TextButton(
                    child: Text('$count'),
                    onPressed: () {
                      count++;
                    },
                  ),
              0.obs)),
    );
  }
}
