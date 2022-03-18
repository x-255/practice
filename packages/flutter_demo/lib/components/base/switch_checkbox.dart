import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:get/get.dart';

class SwitchDemo extends StatelessWidget {
  const SwitchDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ValueBuilder<bool>(
        initialValue: true,
        builder: (value, update) => FlexCenter([
          Switch(
            value: value,
            activeColor: Colors.amber,
            onChanged: update,
          ),
          TextButton(
            child: const Text('change value'),
            onPressed: () {
              update(!value);
            },
          )
        ]),
      ),
    );
  }
}

class CheckboxDemo extends StatelessWidget {
  const CheckboxDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _c1(),
        const SizedBox(
          height: 50,
        ),
        _c2(),
      ]),
    );
  }

  Widget _c1() => ObxValue<RxBool>(
      (data) => Checkbox(
          value: data.value, activeColor: Colors.greenAccent, onChanged: data),
      true.obs);

  Widget _c2() => ObxValue<RxnBool>(
      (data) => Column(
            children: [
              Checkbox(
                value: data.value,
                tristate: true,
                onChanged: data.trigger,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextButton(
                    child: const Text('true'),
                    onPressed: () {
                      data.trigger(true);
                    },
                  ),
                  TextButton(
                    child: const Text('false'),
                    onPressed: () {
                      data.trigger(false);
                    },
                  ),
                  TextButton(
                    child: const Text('indeterminate'),
                    onPressed: () {
                      data.trigger(null);
                    },
                  ),
                ],
              )
            ],
          ),
      RxnBool(false));
}
