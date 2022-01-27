import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:json_annotation/json_annotation.dart';

part 'http.g.dart';

class MyHttp extends StatefulWidget {
  const MyHttp({Key? key}) : super(key: key);

  @override
  _MyHttpState createState() => _MyHttpState();
}

/* --------------------------------- 自己处理数据 --------------------------------- */
class _MyHttpState extends State<MyHttp> {
  _Todo? _todo = null;

  @override
  Widget build(BuildContext context) {
    return _todo == null
        ? Text('loading')
        : ListTile(
            title: Text(_todo!.title),
            subtitle: Text(_todo!.completed ? 'ok' : 'no'),
          );
  }

  @override
  void initState() {
    super.initState();
    _getTodo();
  }

  _getTodo() async {
    final res = await http
        .get(Uri.parse('https://jsonplaceholder.typicode.com/todos/1'));
    final todoMap = jsonDecode(res.body);
    setState(() {
      _todo = _Todo.fromJson(todoMap);
    });
  }
}

/* --------------------------- 使用FutureBuilder处理数据 -------------------------- */

class MyHttp2 extends StatefulWidget {
  const MyHttp2({Key? key}) : super(key: key);

  @override
  _MyHttp2State createState() => _MyHttp2State();
}

class _MyHttp2State extends State<MyHttp2> {
  late Future<_Todo> _todo;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FutureBuilder<_Todo>(
        future: _todo,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final data = snapshot.data!;
            return Text('title: ${data.title}, completed: ${data.completed}');
          }
          return const CircularProgressIndicator();
        },
      ),
    );
  }

  Future<_Todo> _fetchTodo() async {
    final res = await http
        .get(Uri.parse('https://jsonplaceholder.typicode.com/todos/1'));
    if (res.statusCode == 200) {
      return _Todo.fromJson(jsonDecode(res.body));
    }
    throw Exception('Failed to load todo');
  }

  @override
  void initState() {
    super.initState();
    _todo = _fetchTodo();
  }
}

/* -------------------------------------------------------------------------- */

typedef _Json = Map<String, dynamic>;

@JsonSerializable()
class _Todo {
  final String title;
  final bool completed;

  _Todo(this.title, this.completed);

  factory _Todo.fromJson(_Json json) => _$TodoFromJson(json);
}
