import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_demo/components/square.dart';
import 'package:get/get.dart';

class AnimationDemo extends StatelessWidget {
  const AnimationDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _Scale(),
    );
  }
}

class _Scale extends StatelessWidget {
  _Scale({Key? key}) : super(key: key);

  final _con = Get.put(_ScaleCon());

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GetBuilder<_ScaleCon>(
        init: _con,
        builder: (con) => Square(con.animation.value),
      ),
    );
  }
}

class _ScaleCon extends GetxController with GetSingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void onInit() {
    super.onInit();

    controller = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );

    // 使用线性曲线
    animation = Tween(begin: .0, end: 300.0).animate(controller)
      ..addListener(update);

    // 使用弹性曲线
    /* animation = CurvedAnimation(parent: controller, curve: Curves.bounceIn)
      ..addListener(update);
    animation = Tween(begin: .0, end: 300.0).animate(animation)
      ..addListener(update); */

    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        controller.forward();
      }
    });

    controller.forward();
  }

  @override
  void onClose() {
    super.onClose();

    controller.dispose();
  }
}

// 使用 AnimatedWidget 简化 _Scale
class _Scale2 extends StatelessWidget {
  _Scale2({Key? key}) : super(key: key);

  final _con = Get.put(_ScaleCon());

  @override
  Widget build(BuildContext context) {
    return GetBuilder<_ScaleCon>(
      init: _con,
      builder: (con) => AnimatedSquare(
        listenable: con.animation,
      ),
    );
  }
}

class AnimatedSquare extends AnimatedWidget {
  const AnimatedSquare({Key? key, required Listenable listenable})
      : super(key: key, listenable: listenable);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;

    return Center(
      child: Square(animation.value),
    );
  }
}

// 用 AnimatedBuilder 重构
class _Scale3 extends StatelessWidget {
  _Scale3({Key? key}) : super(key: key);

  final _con = Get.put(_ScaleCon());

  @override
  Widget build(BuildContext context) {
    return GetBuilder<_ScaleCon>(
      init: _con,
      builder: (con) => AnimatedBuilder(
        animation: con.animation,
        child: const Square(double.infinity),
        builder: (_, child) => Center(
          child: SizedBox(
            width: con.animation.value,
            height: con.animation.value,
            child: child,
          ),
        ),
      ),
    );
  }
}

// 封装过渡效果来复用动画
class _Scale4 extends StatelessWidget {
  _Scale4({Key? key}) : super(key: key);

  final _con = Get.put(_ScaleCon());

  @override
  Widget build(BuildContext context) {
    return GetBuilder<_ScaleCon>(
      init: _con,
      builder: (con) => GrowTransition(
        animation: con.animation,
        child: const Square(double.infinity),
      ),
    );
  }
}

class GrowTransition extends StatelessWidget {
  const GrowTransition({
    Key? key,
    this.child,
    required this.animation,
  }) : super(key: key);

  final Widget? child;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      child: const Square(double.infinity),
      builder: (_, child) => Center(
        child: SizedBox(
          width: animation.value,
          height: animation.value,
          child: child,
        ),
      ),
    );
  }
}
