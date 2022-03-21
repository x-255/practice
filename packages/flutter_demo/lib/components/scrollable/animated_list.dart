import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AnimatedListDemo extends StatelessWidget {
  AnimatedListDemo({Key? key}) : super(key: key);

  final _con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          AnimatedList(
            key: _Con.key,
            initialItemCount: _con.data.length,
            itemBuilder: (context, i, animation) => FadeTransition(
              opacity: animation,
              child: buildItem(context, i),
            ),
          ),
          buildAddBtn(),
        ],
      ),
    );
  }

  Widget buildItem(BuildContext context, int i) {
    final char = _con.data[i];

    return ListTile(
      key: ValueKey(char),
      title: Text(char),
      trailing: IconButton(
        icon: const Icon(Icons.delete),
        // 点击时删除
        onPressed: () => _con.handleRemove(context, buildItem(context, i), i),
      ),
    );
  }

  Widget buildAddBtn() => Positioned(
        bottom: 30,
        right: 30,
        child: FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: _con.handleAdd,
        ),
      );
}

class _Con extends GetxController {
  static final key = GlobalKey<AnimatedListState>();

  int counter = 0;
  final data = <String>[].obs;

  void handleAdd() {
    data.add('${++counter}');
    key.currentState!.insertItem(data.length - 1);
  }

  void handleRemove(BuildContext context, Widget item, int i) {
    key.currentState!.removeItem(
      i,
      (context, animation) {
        data.removeAt(i);

        return FadeTransition(
          opacity: CurvedAnimation(
            parent: animation,
            //让透明度变化的更快一些
            curve: const Interval(0.5, 1.0),
          ),
          // 不断缩小列表项的高度
          child: SizeTransition(
            sizeFactor: animation,
            child: item,
          ),
        );
      },
      duration: const Duration(milliseconds: 200),
    );
  }

  @override
  void onInit() {
    for (var i = 0; i < 10; i++) {
      data.add('${++counter}');
    }

    super.onInit();
  }
}
