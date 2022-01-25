/*
 * @Description: 传递数据到新页面
 * @LastEditTime: 2022-01-24 14:16:03
 */

import 'package:flutter/material.dart';
import 'package:flutter_app/Navigator/todo_details.dart';

class Todo {
  final String title;
  final String description;

  const Todo(this.title, this.description);
}

class Todos extends StatelessWidget {
  Todos({Key? key}) : super(key: key);

  final List<Todo> _list = List.generate(
      20,
      (i) => Todo(
            'Todo $i',
            'A description of what needs to be done for Todo $i',
          ));

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: _list.length,
        itemBuilder: (context, index) => ListTile(
              title: Text(_list[index].title),
              onTap: () {
                // 方式一
                /* Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (ctx) => TodoDetails(todo: _list[index]))); */

                // 方式二（使用 RouteSettings 传递参数）
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (ctx) => TodoDetails2(),
                        settings: RouteSettings(arguments: _list[index])));
              },
            ));
  }
}
