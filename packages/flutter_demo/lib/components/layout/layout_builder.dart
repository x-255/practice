import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flex_center.dart';

class LayoutBuilderDemo extends StatelessWidget {
  LayoutBuilderDemo({Key? key}) : super(key: key);

  final _children = List.filled(7, const Text("A"));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        // 限制宽度为190，小于 200
        SizedBox(width: 190, child: ResponsiveColumn(children: _children)),
        const SizedBox(
          height: 50,
        ),
        ResponsiveColumn(children: _children),
      ]),
    );
  }
}

class ResponsiveColumn extends StatelessWidget {
  final List<Widget> children;

  const ResponsiveColumn({Key? key, required this.children}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 200) {
          return Column(
            children: children,
          );
        } else {
          final _children = <Widget>[];
          final len = children.length;

          for (var i = 0; i < len; i += 2) {
            if (i < len - 1) {
              _children.add(Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [children[i], children[i + 1]],
              ));
            } else {
              _children.add(children[i]);
            }
          }

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: _children,
          );
        }
      },
    );
  }
}
