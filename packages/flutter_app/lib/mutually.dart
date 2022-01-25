/*
 * @Description: 交互
 * @LastEditTime: 2022-01-24 14:08:09
 */

import 'package:flutter/material.dart';

/* ---------------------------------- form ---------------------------------- */

class MyForm extends StatefulWidget {
  const MyForm({Key? key}) : super(key: key);

  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _formKey = GlobalKey<FormState>();

  void _handleSub() {
    if (_formKey.currentState!.validate()) {
      print('==========');
      print(_formKey.currentState);
      print('==========');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            decoration: const InputDecoration(hintText: 'xxxxx'),
            validator: (val) {
              if (val == null || val.isEmpty) {
                return 'Please enter some text';
              }
            },
          ),
          ElevatedButton(onPressed: _handleSub, child: const Text('submit'))
        ],
      ),
    );
  }
}
