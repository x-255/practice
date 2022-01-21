/*
 * @Description: Flutter 布局基础教程
 * @LastEditTime: 2022-01-21 11:13:23
 */
import 'package:flutter/material.dart';

class BlueBox extends StatelessWidget {
  const BlueBox({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        color: Colors.blue,
        border: Border.all(),
      ),
    );
  }
}

class BiggerBlueBox extends StatelessWidget {
  const BiggerBlueBox({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 80,
      decoration: BoxDecoration(
        color: Colors.blue,
        border: Border.all(),
      ),
    );
  }
}

class RowBox extends StatelessWidget {
  const RowBox({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.center,
        // crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.account_balance_outlined,
            size: 50,
            color: Colors.blue,
          ),
          Image.network('https://picsum.photos/id/1036/200/200')
        ],
      ),
      color: Colors.deepOrange[100],
      height: 100,
    );
  }
}

class MyMcFlutter extends StatelessWidget {
  const MyMcFlutter({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(fontSize: 22);
    return Center(
      child: Container(
        decoration: BoxDecoration(border: Border.all(color: Colors.black87)),
        child: Column(
          children: [
            Row(
              children: [
                const Icon(
                  Icons.account_circle,
                  color: Colors.black,
                  size: 60,
                ),
                Column(
                  children: const [
                    Text(
                      'Flutter McFlutter',
                      style:
                          TextStyle(fontSize: 35, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      'Experienced App Developer',
                      style: textStyle,
                    )
                  ],
                  crossAxisAlignment: CrossAxisAlignment.start,
                ),
              ],
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceAround,
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              children: const [
                Text(
                  '123 Main Street',
                  style: textStyle,
                ),
                Text(
                  '(415) 555-0198',
                  style: textStyle,
                )
              ],
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              children: const [
                Icon(
                  Icons.accessibility_rounded,
                  size: 32,
                ),
                Icon(
                  Icons.timer,
                  size: 32,
                ),
                Icon(
                  Icons.phone_android,
                  size: 32,
                ),
                Icon(
                  Icons.phone_iphone,
                  size: 32,
                ),
              ],
              mainAxisAlignment: MainAxisAlignment.spaceAround,
            )
          ],
          mainAxisSize: MainAxisSize.min,
        ),
        padding: const EdgeInsets.all(20.0),
        width: 400,
      ),
    );
  }
}

class McFlutter extends StatelessWidget {
  const McFlutter({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
          _header(context),
          const SizedBox(
            height: 8,
          ),
          _contact(),
          const SizedBox(
            height: 16,
          ),
          _icons()
        ],
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch);
  }

  Widget _header(BuildContext ctx) {
    return Row(
      children: [
        const Padding(
            child: Icon(
              Icons.account_circle,
              size: 50,
            ),
            padding: EdgeInsets.all(8)),
        Column(
          children: [
            Text(
              'Flutter McFlutter',
              style: Theme.of(ctx).textTheme.headline5,
            ),
            const Text('Experienced App Developer')
          ],
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
        )
      ],
    );
  }

  Widget _contact() {
    return Row(
      children: const [Text('123 Main Street'), Text('(415) 555-0198')],
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
    );
  }

  Widget _icons() {
    return Row(
      children: const [
        Icon(Icons.accessibility),
        Icon(Icons.timer),
        Icon(Icons.phone_android),
        Icon(Icons.phone_iphone),
      ],
      mainAxisAlignment: MainAxisAlignment.spaceAround,
    );
  }
}
