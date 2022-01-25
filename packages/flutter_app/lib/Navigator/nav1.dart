/*
 * @Description: 从一个页面回传数据
 * @LastEditTime: 2022-01-24 14:11:24
 */

import 'package:flutter/material.dart';
import 'package:flutter_app/Navigator/nav2.dart';

class Nav1 extends StatelessWidget {
  const Nav1({Key? key}) : super(key: key);

  void _goNav2(BuildContext ctx) async {
    final res = await Navigator.push(
        ctx, MaterialPageRoute(builder: (ctx) => const Nav2()));

    print('res====${res}');
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: const Text('go 2'),
        onPressed: () {
          _goNav2(context);
        },
      ),
    );
  }
}
