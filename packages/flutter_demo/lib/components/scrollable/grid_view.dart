import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: _g4());
  }
}
