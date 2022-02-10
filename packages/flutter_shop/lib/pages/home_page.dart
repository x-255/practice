import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/api/method.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:url_launcher/url_launcher.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with AutomaticKeepAliveClientMixin {
  @override
  get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('百姓生活+'),
      ),
      body: FutureBuilder(
        future: get('homePageContext'),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final dynamic data = snapshot.data!;

            return SingleChildScrollView(
              child: Column(
                children: [
                  SwiperDiy(data['slides']),
                  TopNavigator(
                    data['category'],
                  ),
                  AdBanner(
                    data['advertesPicture'],
                  ),
                  const LeaderPhone(),
                  Recommend(data['recommend'])
                ],
              ),
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
  const SwiperDiy(
    this.list, {
    Key? key,
  }) : super(key: key);

  final List list;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1.sw,
      height: 300.h,
      child: Swiper(
        itemBuilder: (context, index) => Image.network(
          list[index]['img'],
          fit: BoxFit.fill,
        ),
        itemCount: list.length,
        pagination: SwiperPagination(),
        autoplay: true,
      ),
    );
  }
}

class TopNavigator extends StatelessWidget {
  const TopNavigator(
    this.list, {
    Key? key,
  }) : super(key: key);

  final List list;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 320.h,
      padding: const EdgeInsets.all(3),
      child: GridView.count(
        crossAxisCount: 5,
        padding: const EdgeInsets.all(4),
        children:
            List<Widget>.from(list.map((item) => _gridViewItem(context, item))),
      ),
    );
  }

  Widget _gridViewItem(BuildContext context, item) {
    return InkWell(
      child: Column(
        children: [
          Container(
            width: 95.sp,
            height: 95.sp,
            margin: const EdgeInsets.only(bottom: 5),
            decoration: ShapeDecoration(
                shape: const CircleBorder(),
                image: DecorationImage(image: NetworkImage(item['img']))),
          ),
          Text(item['mallCategoryName'])
        ],
      ),
      onTap: () {
        print('taptap');
      },
    );
  }
}

class AdBanner extends StatelessWidget {
  const AdBanner(this.adUrl, {Key? key}) : super(key: key);

  final String adUrl;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.network(
        adUrl,
        width: 1.sw,
        height: 50.h,
      ),
    );
  }
}

class LeaderPhone extends StatelessWidget {
  const LeaderPhone({Key? key}) : super(key: key);

  void _handlePhone() async {
    // const url = 'tel:17788889999';
    // if (!await launch(url)) {
    //   print('Could not launch...');
    // }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1.sw,
      height: 300.h,
      child: InkWell(
        child: Image.network('https://picsum.photos/id/3/750/300'),
        onTap: _handlePhone,
      ),
    );
  }
}

class Recommend extends StatelessWidget {
  const Recommend(this.list, {Key? key}) : super(key: key);

  final List list;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 380.h,
      margin: const EdgeInsets.only(top: 10),
      child: Column(
        children: [_titleWidget(), _recommedList()],
      ),
    );
  }

  Widget _titleWidget() => Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.fromLTRB(10, 2, 0, 5),
        decoration: const BoxDecoration(
            color: Colors.white,
            border:
                Border(bottom: BorderSide(width: .5, color: Colors.black12))),
        child: const Text(
          '商品推荐',
          style: TextStyle(color: Colors.pink),
        ),
      );

  Widget _item(item) => InkWell(
        child: Container(
          width: 250.h,
          height: 330.h,
          padding: const EdgeInsets.all(8),
          decoration: const BoxDecoration(
              color: Colors.white,
              border:
                  Border(left: BorderSide(width: 0.5, color: Colors.black12))),
          child: Column(
            children: [
              Image.network(item['img']),
              Text('￥${item['mallPrice']}'),
              Text(
                '￥${item['price']}',
                style: const TextStyle(
                    decoration: TextDecoration.lineThrough, color: Colors.grey),
              )
            ],
          ),
        ),
        onTap: () {},
      );

  Widget _recommedList() => Container(
        height: 330.h,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: list.length,
          itemBuilder: (context, index) => _item(list[index]),
        ),
      );
}
