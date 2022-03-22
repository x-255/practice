import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HeroDemo extends StatelessWidget {
  const HeroDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        alignment: Alignment.topCenter,
        child: InkWell(
          child: Hero(
            tag: 'hhh',
            child: ClipOval(
              child: Image.asset(
                'assets/imgs/meimei.png',
                width: 100,
              ),
            ),
          ),
          onTap: () {
            Get.to(const HeroDemo2());
          },
        ),
      ),
    );
  }
}

class HeroDemo2 extends StatelessWidget {
  const HeroDemo2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Hero(
          tag: "hhh", //唯一标记，前后两个路由页Hero的tag必须相同
          child: Image.asset("assets/imgs/meimei.png"),
        ),
      ),
    );
  }
}
