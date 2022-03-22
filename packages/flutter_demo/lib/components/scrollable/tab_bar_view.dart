import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TabBarViewDemo extends StatelessWidget {
  TabBarViewDemo({Key? key}) : super(key: key);

  final tabs = ["新闻", "历史", "图片"];

  final con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        bottom: TabBar(
          controller: con.tabController,
          tabs: con.tabs
              .map((e) => Tab(
                    text: e,
                  ))
              .toList(),
        ),
      ),
      body: TabBarView(
        controller: con.tabController,
        children: tabs
            .map((e) => Center(
                  child: Text(e),
                ))
            .toList(),
      ),
    );
  }
}

class _Con extends GetxController with GetSingleTickerProviderStateMixin {
  late TabController tabController;
  final tabs = ["新闻", "历史", "图片"];

  @override
  void onInit() {
    super.onInit();

    tabController = TabController(length: tabs.length, vsync: this);
  }

  @override
  void onClose() {
    super.onClose();

    tabController.dispose();
  }
}

class TabBarViewDemo2 extends StatelessWidget {
  TabBarViewDemo2({Key? key}) : super(key: key);

  final tabs = ["历史", "图片", "新闻"];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: tabs.length,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: tabs
                .map((e) => Tab(
                      text: e,
                    ))
                .toList(),
          ),
        ),
        body: TabBarView(
          children: tabs
              .map((e) => Center(
                    child: Text(e),
                  ))
              .toList(),
        ),
      ),
    );
  }
}
