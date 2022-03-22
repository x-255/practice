import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

class GridViewDemo extends StatelessWidget {
  GridViewDemo({Key? key}) : super(key: key);

  final _children = [
    const Icon(Icons.ac_unit),
    const Icon(Icons.airport_shuttle),
    const Icon(Icons.all_inclusive),
    const Icon(Icons.beach_access),
    const Icon(Icons.cake),
    const Icon(Icons.free_breakfast)
  ];

  Widget _g1() => GridView(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          childAspectRatio: 2,
        ),
        children: _children,
      );

  Widget _g2() => GridView(
        gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 240.w,
          childAspectRatio: 1,
        ),
        children: _children,
      );

  Widget _g3() => GridView.count(
        crossAxisCount: 5,
        childAspectRatio: 2,
        children: _children,
      );

  Widget _g4() => GridView.extent(
        maxCrossAxisExtent: 360.w,
        childAspectRatio: 1,
        children: _children,
      );

  final _con = Get.put(_Con());
  Widget _g5() => Obx(() => GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3, //每行三列
          childAspectRatio: 1.0, //显示区域宽高相等
        ),
        itemCount: _con.icons.length,
        itemBuilder: (_, i) => Icon(_con.icons[i]),
      ));

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: _g5());
  }
}

class _Con extends GetxController {
  final icons = <IconData>[].obs;

  @override
  void onInit() {
    super.onInit();

    Future.delayed(const Duration(seconds: 1), () {
      icons.addAll([
        Icons.ac_unit,
        Icons.airport_shuttle,
        Icons.all_inclusive,
        Icons.beach_access,
        Icons.cake,
        Icons.free_breakfast,
      ]);
    });
  }
}
