import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PageDemo1 extends StatelessWidget {
  const PageDemo1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            final data = await Get.to(PageDemo2());
            print(data);
          },
          child: Text('222'),
        ),
      ),
    );
  }
}

class PageDemo2 extends StatelessWidget {
  const PageDemo2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Get.back(result: {'aa': 'a', 'bb': 99});
          },
          child: Text('back'),
        ),
      ),
    );
  }
}
