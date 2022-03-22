import 'package:flutter/material.dart';

class PageViewDemo extends StatelessWidget {
  PageViewDemo({Key? key}) : super(key: key);

  final _children = List.generate(6, (i) => _Page(text: 'page $i'));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        // scrollDirection: Axis.vertical, // 滑动方向为垂直方向
        allowImplicitScrolling: true,
        children: _children,
      ),
    );
  }
}

class _Page extends StatefulWidget {
  const _Page({Key? key, required this.text}) : super(key: key);

  final String text;

  @override
  State<_Page> createState() => __PageState();
}

class __PageState extends State<_Page> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true; // 是否需要缓存

  @override
  Widget build(BuildContext context) {
    super.build(context); // 必须调用
    print(widget.text);
    return Center(child: Text(widget.text, textScaleFactor: 5));
  }
}
