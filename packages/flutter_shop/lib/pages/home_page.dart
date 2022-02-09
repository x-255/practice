import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/api/method.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('百姓生活+'),
      ),
      body: FutureBuilder(
        future: getHomePageContent(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final dynamic data = snapshot.data!;
            final List slides = data['slides'];
            return Column(
              children: [
                SwiperDiy(list: slides)
              ],
            );
          } else {
            return const Center(
              child: Text('loadgin...'),
            );
          }
        },
      ),
    );
  }
}

class SwiperDiy extends StatelessWidget {
  const SwiperDiy({
    Key? key,
    required this.list,
  }) : super(key: key);

  final List list;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 375.w,
      height: 300.h,
      child: Swiper(
        itemBuilder: (context, index) {
          print(list[index]['img']);
          return Image.network(
          list[index]['img'],
          fit: BoxFit.fill,
        );
        },
        itemCount: list.length,
        pagination: SwiperPagination(),
        autoplay: true,
      ),
    );
  }
}
