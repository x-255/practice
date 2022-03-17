import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flexCenter.dart';
import 'package:get/get.dart';

class FormDemo extends StatelessWidget {
  FormDemo({Key? key}) : super(key: key);

  final _formKey = GlobalKey<FormState>();
  final _c = Get.put(_FormController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _formKey,
        autovalidateMode: AutovalidateMode.onUserInteraction,
        child: GetBuilder<_FormController>(
          init: _c,
          builder: (c) => FlexCenter([
            TextFormField(
              autofocus: true,
              decoration: const InputDecoration(
                labelText: "用户名",
                hintText: "用户名或邮箱",
                icon: Icon(Icons.person),
              ),
              validator: (v) => v!.trim().isEmpty ? '用户名不能为空' : null,
              onChanged: c.username,
            ),
            TextFormField(
              decoration: const InputDecoration(
                labelText: "密码",
                hintText: "您的登录密码",
                icon: Icon(Icons.lock),
              ),
              obscureText: true,
              validator: (v) => v!.trim().length < 6 ? '密码不能少于6位' : null,
              onChanged: c.password,
            ),
            Padding(
              padding: const EdgeInsets.only(top: 28.0),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: ElevatedButton(
                      child: const Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Text("登录"),
                      ),
                      onPressed: () {
                        // 通过_formKey.currentState 获取FormState后，
                        // 调用validate()方法校验用户名密码是否合法，校验
                        // 通过后再提交数据。
                        if (_formKey.currentState!.validate()) {
                          print(
                              '{ username: ${c.username}, password: ${c.password} }');
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),
          ]),
        ),
      ),
    );
  }
}

class _FormController extends GetxController {
  var username = ''.obs;
  var password = ''.obs;
}
