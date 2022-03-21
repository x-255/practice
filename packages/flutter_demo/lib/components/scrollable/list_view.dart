import 'dart:async';
import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ListViewDemo extends StatelessWidget {
  const ListViewDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // body: _Builder(),
      // body: _Separated(),
      body: _InfiniteListView(),
    );
  }
}

class _Builder extends StatelessWidget {
  const _Builder({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      itemCount: 50,
      itemExtent: 50,
      itemBuilder: (_, i) {
        return ListTile(
          title: Text('item $i'),
        );
      },
    );
  }
}

class _Separated extends StatelessWidget {
  const _Separated({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const color1 = Colors.amber;
    const color2 = Colors.blueAccent;

    return ListView.separated(
      itemCount: 20,
      itemBuilder: (_, i) => ListTile(
        title: Text('item $i'),
      ),
      separatorBuilder: (_, i) =>
          Divider(height: 2, color: i % 2 == 0 ? color1 : color2),
    );
  }
}

class _Con extends GetxController {
  static const loadingTag = "##loading##";

  var words = [loadingTag].obs;

  void retrieveData() {
    Future.delayed(const Duration(seconds: 1)).then((e) {
      words.insertAll(
        words.length - 1,
        //每次生成20个单词
        generateWordPairs().take(20).map((e) => e.asPascalCase).toList(),
      );
    });
  }

  @override
  void onInit() {
    retrieveData();
    super.onInit();
  }
}

class _InfiniteListView extends StatelessWidget {
  _InfiniteListView({Key? key}) : super(key: key);

  final con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Obx(() => ListView.separated(
          itemCount: con.words.length,
          separatorBuilder: (context, index) => const Divider(height: .0),
          itemBuilder: (_, i) {
            final words = con.words.value;

            //如果到了表尾
            if (words[i] == _Con.loadingTag) {
              //不足100条，继续获取数据
              if (words.length - 1 < 50) {
                //获取数据
                con.retrieveData();

                //加载时显示loading
                return Container(
                  padding: const EdgeInsets.all(16),
                  alignment: Alignment.center,
                  child: const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
                );
              } else {
                //已经加载了100条数据，不再获取数据。
                return Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(16.0),
                  child: const Text(
                    "没有更多了",
                    style: TextStyle(color: Colors.grey),
                  ),
                );
              }
            }

            //显示单词列表项
            return ListTile(
              title: Text(words[i]),
            );
          },
        ));
  }
}
