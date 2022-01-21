/*
 * @Description: Flutter 中的布局
 * @LastEditTime: 2022-01-21 14:52:14
 */

import 'package:flutter/material.dart';

class Layout3 extends StatelessWidget {
  const Layout3({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
            child: Container(
          child: const Text('xxxx'),
          color: Colors.amber,
          margin: const EdgeInsets.all(20),
          padding: const EdgeInsets.all(10),
        )),
        const Text('cccc')
      ],
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
    );
  }
}

final imgs = List.generate(
    30,
    (i) => Image.network(
          'https://picsum.photos/id/5$i/200/200',
          fit: BoxFit.cover,
        ));

class GridView1 extends StatelessWidget {
  const GridView1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.extent(maxCrossAxisExtent: 200, children: imgs);
  }
}

class GridView2 extends StatelessWidget {
  const GridView2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 4,
      children: imgs,
    );
  }
}

class ListView1 extends StatelessWidget {
  const ListView1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: imgs,
    );
  }
}

class Stack1 extends StatelessWidget {
  const Stack1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: const Alignment(.6, .6),
      children: [
        CircleAvatar(
          child: Image.network('https://picsum.photos/id/1027/200/200'),
          radius: 100,
        ),
        Container(
          decoration: const BoxDecoration(
            color: Colors.black45,
          ),
          child: const Text(
            'Mia B',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }
}

class Card1 extends StatelessWidget {
  const Card1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Card(
      // elevation: 20,
      child: ListTile1(),
    );
  }
}

class ListTile1 extends StatelessWidget {
  const ListTile1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const ListTile(
      title: Text('title'),
      subtitle: Text('subsubsub'),
      leading: Text('ll'),
      trailing: Text('trailing'),
    );
  }
}
