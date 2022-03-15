import 'package:flutter_demo/demos/count.dart';
import 'package:flutter_demo/main.dart';
import 'package:get/get.dart';

class Routes {
  static const initial = '/';
  static const count = '/count';

  static final routes = [
    GetPage(name: initial, page: () => MyHome()),
    GetPage(name: count, page: () => CountDemo()),
  ];
}
