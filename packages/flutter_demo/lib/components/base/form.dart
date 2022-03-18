import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';
import 'package:get/get.dart';

class FormDemo extends StatelessWidget {
  FormDemo({Key? key}) : super(key: key);

  final _c = Get.put(_FormController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        child: Builder(
          builder: (context) => FlexCenter([
            TextFormField(
              decoration: const InputDecoration(
                labelText: "用户名",
                hintText: "用户名或邮箱",
                icon: Icon(Icons.person),
              ),
              validator: (v) => v!.trim().isEmpty ? '用户名不能为空' : null,
              onChanged: _c.username,
            ),
            TextFormField(
              decoration: const InputDecoration(
                labelText: "密码",
                hintText: "您的登录密码",
                icon: Icon(Icons.lock),
              ),
              obscureText: true,
              validator: (v) => v!.trim().length < 6 ? '密码不能少于6位' : null,
              onChanged: _c.password,
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
                        final form = Form.of(context)!;
                        if (form.validate()) {
                          print(
                            '{username: ${_c.username}, password: ${_c.password}}',
                          );
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
