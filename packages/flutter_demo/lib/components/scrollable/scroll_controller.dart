import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ScrollControllerDemo extends StatelessWidget {
  ScrollControllerDemo({Key? key}) : super(key: key);

  final con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Obx(() => Scaffold(
        appBar: AppBar(title: const Text("滚动控制")),
        body: Scrollbar(
          child: ListView.builder(
            controller: con.scrollCon,
            itemCount: 50,
            itemExtent: 100,
            itemBuilder: (_, i) => ListTile(
              title: Text('item$i'),
            ),
          ),
        ),
        floatingActionButton: con.showTopBtn.value
            ? FloatingActionButton(
                child: const Icon(Icons.arrow_upward),
                onPressed: () {
                  con.scrollCon.animateTo(
                    0,
                    duration: const Duration(milliseconds: 200),
                    curve: Curves.ease,
                  );
                },
              )
            : null));
  }
}

class _Con extends GetxController {
  final scrollCon = ScrollController();
  var showTopBtn = false.obs;

  @override
  void onInit() {
    super.onInit();

    scrollCon.addListener(() {
      final offset = scrollCon.offset;

      if (offset < 1000 && showTopBtn.value) {
        showTopBtn(false);
      } else if (offset >= 1000 && !showTopBtn.value) {
        showTopBtn(true);
      }
    });
  }

  @override
  void onClose() {
    super.onClose();
    scrollCon.dispose();
  }
}

class ScrollNotificationTestRoute extends StatelessWidget {
  const ScrollNotificationTestRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('滚动监听')),
      body: Scrollbar(
        child: ValueBuilder<int>(
          initialValue: 0,
          builder: (progress, updater) =>
              NotificationListener<ScrollNotification>(
            child: Stack(
              alignment: Alignment.center,
              children: [
                ListView.builder(
                  itemCount: 100,
                  itemExtent: 50.0,
                  itemBuilder: (context, index) =>
                      ListTile(title: Text("$index")),
                ),
                CircleAvatar(
                  radius: 30,
                  child: Text('$progress%'),
                  backgroundColor: Colors.black54,
                ),
              ],
            ),
            onNotification: (notification) {
              final metrics = notification.metrics;

              updater((metrics.pixels / metrics.maxScrollExtent * 100).toInt());

              return false;
            },
          ),
        ),
      ),
    );
  }
}
