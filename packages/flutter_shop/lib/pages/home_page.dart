import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    getHttp();
    return const Scaffold(
        body: Center(
      child: Text('商城首页'),
    ));
  }

  void getHttp() async {
    try {
      var data = {'name': 'xxx'};

      Response res = await Dio().get(
          'https://www.easy-mock.com/mock/5c60131a4bed3a6342711498/baixing/dabaojian?name=xoox');
      return print(res);
    } catch (e) {
      return print(e);
    }
  }
}
