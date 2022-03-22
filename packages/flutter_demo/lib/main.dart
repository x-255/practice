import 'package:flutter/material.dart';
import 'package:flutter_demo/animation/hero.dart';
import 'package:flutter_demo/getx/tr.dart';
import 'package:flutter_demo/router/router.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  final zh = const Locale('zh', 'CN');

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: Routes.initial,
      getPages: Routes.routes,
      translations: Messages(),
      locale: zh,
      fallbackLocale: zh,
    );
  }
}

class MyHome extends StatelessWidget {
  const MyHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(
        BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width,
            maxHeight: MediaQuery.of(context).size.height),
        designSize: const Size(750, 1334),
        context: context,
        minTextAdapt: true,
        orientation: Orientation.portrait);

    return HeroDemo();
  }
}
