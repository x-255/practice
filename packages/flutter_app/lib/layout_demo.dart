/*
 * @Description: 布局+交互
 * @LastEditTime: 2022-01-24 10:41:18
 */

import 'package:flutter/material.dart';
import 'package:flutter_app/utils.dart';

class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final banner = Image.network(
      'https://picsum.photos/id/98/3264/2176',
      fit: BoxFit.cover,
      width: double.infinity,
      height: 240,
    );

    final header = Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Expanded(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Oeschinen Lake Campground',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Text('Kandersteg, Switzerland',
                    style: TextStyle(color: hex2color('#b9b9b9'))),
              )
            ],
          )),
          const FavoriteWidget()
        ],
      ),
    );

    final primaryColor = hex2color('#2397f4');

    final iconRow = Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _createIconCol(color: primaryColor, icon: Icons.call, label: 'CALL'),
        _createIconCol(
            color: primaryColor, icon: Icons.near_me, label: 'ROUTE'),
        _createIconCol(color: primaryColor, icon: Icons.share, label: 'SHARE'),
      ],
    );

    return Column(
      children: [
        banner,
        header,
        iconRow,
        Container(
          padding: const EdgeInsets.all(20),
          child: const Text(
            'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
            'Alps. Situated 1,578 meters above sea level, it is one of the '
            'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
            'half-hour walk through pastures and pine forest, leads you to the '
            'lake, which warms to 20 degrees Celsius in the summer. Activities '
            'enjoyed here include rowing, and riding the summer toboggan run.',
          ),
        )
      ],
    );
  }
}

Column _createIconCol(
        {required IconData icon,
        required String label,
        required Color color}) =>
    Column(
      children: [
        Icon(
          icon,
          color: color,
        ),
        Text(
          label,
          style: TextStyle(color: color),
        )
      ],
    );

class FavoriteWidget extends StatefulWidget {
  const FavoriteWidget({Key? key}) : super(key: key);

  @override
  _FavoriteWidgetState createState() => _FavoriteWidgetState();
}

class _FavoriteWidgetState extends State<FavoriteWidget> {
  bool _isFavorited = false;
  int _favoriteCount = 41;

  void _handleChangeFavorited() {
    setState(() {
      _isFavorited = !_isFavorited;

      if (_isFavorited) {
        _favoriteCount++;
      } else {
        _favoriteCount--;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          icon: _isFavorited
              ? const Icon(Icons.star)
              : const Icon(Icons.star_border),
          color: hex2color('#f34532'),
          onPressed: _handleChangeFavorited,
        ),
        Text(
          '$_favoriteCount',
          style: TextStyle(color: Colors.redAccent[600]),
        )
      ],
    );
  }
}
