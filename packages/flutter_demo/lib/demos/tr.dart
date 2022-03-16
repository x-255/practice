import 'package:get/get.dart';
import 'package:flutter/material.dart';

class Messages extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'zh_CN': {
          'hello': '你好 世界',
        },
        'en_US': {
          'hello': 'Hello World',
        }
      };
}

class TrDemo extends StatelessWidget {
  const TrDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: ElevatedButton(
        child: Text('hello'.tr),
        onPressed: () {
          const zh = Locale('zh', 'CN');
          const en = Locale('en', 'US');

          Get.updateLocale(Get.locale == zh ? en : zh);
        },
      )),
    );
  }
}
