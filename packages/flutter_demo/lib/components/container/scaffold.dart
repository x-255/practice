import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

class _Con extends GetxController with GetSingleTickerProviderStateMixin {
  var navIdx = 0.obs;
  final tabs = ['home', 'business', 'schol'];
  late TabController tabCon;

  @override
  void onInit() {
    super.onInit();
    tabCon = TabController(length: tabs.length, vsync: this);

    ever(navIdx, (int i) {
      tabCon.animateTo(i);
    });
  }
}

class ScaffoldDemo extends StatelessWidget {
  ScaffoldDemo({Key? key}) : super(key: key);

  final _con = Get.put(_Con());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('app name'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              print('share');
            },
          )
        ],
      ),
      bottomNavigationBar: Obx(
        () => BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(
                icon: Icon(Icons.business), label: 'Business'),
            BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
          ],
          currentIndex: _con.navIdx.value,
          fixedColor: Colors.blue,
          onTap: _con.navIdx,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.arrow_upward),
        onPressed: () {},
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      drawer: const MyDrawer(),
      body: TabBarView(
        controller: _con.tabCon,
        children: _con.tabs
            .map((e) => Container(
                  alignment: Alignment.center,
                  child: Text(
                    e,
                    textScaleFactor: 5,
                  ),
                ))
            .toList(),
      ),
    );
  }
}

class MyDrawer extends StatelessWidget {
  const MyDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: MediaQuery.removePadding(
        context: context,
        removeTop: true,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Padding(
                  padding: EdgeInsets.all(38.w),
                  child: ClipOval(
                    child: Image.network(
                      'https://picsum.photos/id/582/200/200',
                      width: 80.w,
                    ),
                  ),
                ),
                const Text(
                  'abc',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            Expanded(
              child: ListView(children: const <Widget>[
                ListTile(
                  leading: Icon(Icons.add),
                  title: Text('Add account'),
                ),
                ListTile(
                  leading: Icon(Icons.settings),
                  title: Text('Manage accounts'),
                ),
              ]),
            )
          ],
        ),
      ),
    );
  }
}
