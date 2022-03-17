import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flexCenter.dart';
import 'package:get/get.dart';

class TextFieldDemo extends StatelessWidget {
  TextFieldDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
          child: FlexCenter([
        _t1(),
        _t2(),
        _t3(),
        _t4(),
        _t5(),
        _t6(),
        const SizedBox(
          height: 50,
        )
      ])),
    );
  }

  /// 键盘输入类型
  Widget _t1() {
    return const TextField(
      keyboardType: TextInputType.multiline,
      maxLines: 2,
      decoration: InputDecoration(labelText: 'label', hintText: 'hint'),
    );
  }

  /// 回车键位图标
  Widget _t2() {
    return const TextField(
      textInputAction: TextInputAction.search,
      decoration: InputDecoration(labelText: 'label', hintText: 'hint'),
    );
  }

  /// 通过controller获取输入框内容+监听文本变化
  Widget _t3() {
    final c = TextEditingController();

    c.addListener(() {
      print('value change: ${c.text}');
    });

    return FlexCenter([
      TextField(
        controller: c,
        decoration: const InputDecoration(labelText: 'label', hintText: 'hint'),
      ),
      OutlinedButton(
        child: const Text('log text'),
        onPressed: () {
          print(c.text);
        },
      )
    ]);
  }

  FocusScopeNode? _focusScopeNode;
  final _focusNode = FocusNode();

  /// 设置、选择文本 + 控制焦点 + 监听焦点状态改变事件
  Widget _t4() {
    final c = TextEditingController();

    _focusNode.addListener(() {
      print(_focusNode.hasFocus);
    });

    return FlexCenter([
      TextField(
        controller: c,
        focusNode: _focusNode,
        decoration: const InputDecoration(labelText: 'label', hintText: 'hint'),
      ),
      OutlinedButton(
        child: const Text('set text'),
        onPressed: () {
          _focusScopeNode ??= FocusScope.of(Get.context!);
          _focusScopeNode!.requestFocus(_focusNode);

          c.text = 'hello world!';
          c.selection = TextSelection(
            baseOffset: 6,
            extentOffset: c.text.length - 1,
          );
        },
      )
    ]);
  }

  /// 自定义样式
  Widget _t5() => const TextField(
        decoration: InputDecoration(
          labelText: 'label',
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.green),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.blue),
          ),
        ),
      );

  /// 通过主题来自定义输入框的样式
  Widget _t6() => Theme(
      data: Theme.of(Get.context!).copyWith(
          // 定义下划线颜色
          hintColor: Colors.red,
          inputDecorationTheme: const InputDecorationTheme(
            // 定义label字体样式
            labelStyle: TextStyle(color: Colors.greenAccent),
            // 定义提示文本样式
            hintStyle: TextStyle(color: Colors.pinkAccent),
          )),
      child: Column(
        children: const [
          TextField(
            decoration: InputDecoration(
                labelText: "用户名",
                hintText: "用户名或邮箱",
                prefixIcon: Icon(Icons.person)),
          ),
          TextField(
            decoration: InputDecoration(
                prefixIcon: Icon(Icons.lock),
                labelText: "密码",
                hintText: "您的登录密码",
                hintStyle: TextStyle(color: Colors.orange, fontSize: 13.0)),
            obscureText: true,
          )
        ],
      ));
}
