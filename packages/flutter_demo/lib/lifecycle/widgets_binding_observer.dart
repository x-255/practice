import 'package:flutter/material.dart';
import 'package:get/get.dart';

class WidgetsBindingObserverDemo extends StatelessWidget {
  const WidgetsBindingObserverDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ValueBuilder<bool>(
      initialValue: true,
      builder: (val, update) => Column(
        children: [
          TextButton(
              onPressed: () {
                update(!val);
              },
              child: const Text('change show')),
          if (val) _Box(),
          const TextField()
        ],
      ),
    );
  }
}

class _Box extends StatelessWidget {
  const _Box({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<_Controller>(
      init: _Controller(),
      builder: (c) => SingleChildScrollView(
        child: Column(
          children: [
            Obx(
              () => Container(
                width: c.size.value,
                height: c.size.value,
                color: Colors.cyan,
              ),
            ),
            Text('hello'.tr),
            ElevatedButton(
              child: const Text('size'),
              onPressed: () {
                c.size.value += 10;
              },
            ),
            ElevatedButton(
              child: const Text('change local'),
              onPressed: () {
                Get.updateLocale(const Locale('en', 'US'));
              },
            ),
            ElevatedButton(
              child: const Text('route to p1'),
              onPressed: () {
                Get.toNamed('/p1');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _Controller extends GetxController with WidgetsBindingObserver {
  var size = 100.0.obs;

  @override
  void onInit() {
    print(123123);
    super.onInit();
    WidgetsBinding.instance?.addObserver(this);
  }

  @override
  void onClose() {
    super.onClose();
    WidgetsBinding.instance?.removeObserver(this);
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // 整个app进入前台、后台
    super.didChangeAppLifecycleState(state);
    switch (state) {
      case AppLifecycleState.inactive:
        //应用程序处于闲置状态并且没有收到用户的输入事件。
        //注意这个状态，在切换到后台时候会触发，所以流程应该是先冻结窗口，然后停止UI
        print('AppLifecycleState.inactive====');
        break;
      case AppLifecycleState.paused:
        //应用程序处于不可见状态
        print('AppLifecycleState.paused=====');
        break;
      case AppLifecycleState.resumed:
        //进入页面的时候不会触发该状态
        //应用程序处于可见状态，并且可以响应用户的输入事件
        print('YMAppLifecycleState.resumed======');
        break;
      case AppLifecycleState.detached:
        print('AppLifecycleState.detached======');
        break;
    }
  }

  @override
  void didChangeMetrics() {
    // 弹出、收起键盘，旋转屏幕
    print('应用尺寸改变时回调');

    return super.didChangeMetrics();
  }

  @override
  Future<bool> didPopRoute() {
    // 用getx路由跳转不会触发
    print('页面pop出去的回调');
    return super.didPopRoute();
  }

  @override
  Future<bool> didPushRoute(String route) {
    // 用getx路由跳转不会触发
    print('页面push的回调');
    return super.didPushRoute(route);
  }

  @override
  void didChangeLocales(List<Locale>? locales) {
    // 用getx修改语言不会触发
    print('更改了系统语言');

    return super.didChangeLocales(locales);
  }
}
