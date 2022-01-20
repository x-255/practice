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

class McFlutter extends StatelessWidget {
  const McFlutter({Key? key}) : super(key: key);

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
