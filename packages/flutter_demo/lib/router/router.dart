import 'package:flutter_demo/getx/bindings.dart';
import 'package:flutter_demo/getx/middleware.dart';
import 'package:flutter_demo/main.dart';
import 'package:get/get.dart';

class Routes {
  static const initial = '/';
  static const bind1 = '/bind1';
  static const bind2 = '/bind2';
  static const md1 = '/page1';
  static const md2 = '/page2';

  static final routes = [
    GetPage(name: initial, page: () => const MyHome()),
    GetPage(
        name: bind1,
        page: () => BindingDemo1(),
        transition: Transition.rightToLeftWithFade,
        binding: BindingsBuilder(() {
          Get.lazyPut(() => BindingController1());
        })),
    GetPage(
        name: bind2,
        page: () => BindingDemo2(),
        transition: Transition.fade,
        binding: BindingsBuilder.put(() => BindingController2())),
    GetPage(
        name: '$md1/:id', page: () => MdDemo1(), middlewares: [Md1(), Md2()]),
    GetPage(name: md2, page: () => const MdDemo2()),
  ];
}
