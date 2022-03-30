import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GetRouter {
  static final routes = [
    GetPage(name: '/p1', page: () => const GetPages1()),
    GetPage(name: '/p2', page: () => const GetPages2()),
    GetPage(name: '/p3', page: () => const GetPages3()),
  ];
}

class GetPageHome extends StatelessWidget {
  const GetPageHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('home'),
    );
  }
}

class GetPages1 extends StatelessWidget {
  const GetPages1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: const Text('to2'),
        onPressed: () {
          Get.toNamed('/p2');
        },
      ),
    );
  }
}

class GetPages2 extends StatelessWidget {
  const GetPages2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: const Text('to3'),
        onPressed: () {
          Get.toNamed('/p3');
        },
      ),
    );
  }
}

class GetPages3 extends StatelessWidget {
  const GetPages3({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: const Text('to1'),
        onPressed: () {
          Get.toNamed('/p1');
        },
      ),
    );
  }
}
