import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/pages/cart_page.dart';
import 'package:flutter_shop/pages/category_page.dart';
import 'package:flutter_shop/pages/home_page.dart';
import 'package:flutter_shop/pages/member_page.dart';

class IndexPage extends StatefulWidget {
  const IndexPage({Key? key}) : super(key: key);

  @override
  _IndexPageState createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  late PageController _pageController;

  final List<BottomNavigationBarItem> bottomTabs = const [
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.home), label: '首页'),
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.search), label: '分类'),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.shopping_cart), label: '购物车'),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.profile_circled), label: '会员中心'),
  ];

  final List<Widget> tabBodies = const [
    HomePage(),
    CategoryPage(),
    CartPage(),
    MemberPage(),
  ];

  int currentIndex = 0;
  dynamic currentPage;

  @override
  void initState() {
    super.initState();
    currentPage = tabBodies[currentIndex];
    _pageController = PageController()
      ..addListener(() {
        if (currentPage != _pageController.page?.round()) {
          setState(() {
            currentPage = _pageController.page?.round();
          });
        }
      });
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    ScreenUtil.init(
        BoxConstraints(maxWidth: size.width, maxHeight: size.height),
        designSize: const Size(750, 1334),
        context: context,
        minTextAdapt: true,
        orientation: Orientation.portrait);

    return Scaffold(
        backgroundColor: const Color.fromRGBO(244, 245, 245, 1.0),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: currentIndex,
          items: bottomTabs,
          onTap: (i) {
            setState(() {
              currentIndex = i;
              currentPage = tabBodies[i];
            });
          },
        ),
        body: IndexedStack(
          index: currentIndex,
          children: tabBodies,
        ));
  }
}
