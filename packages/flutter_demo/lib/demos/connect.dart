import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

class ConnectDemo extends StatelessWidget {
  ConnectDemo({Key? key}) : super(key: key);

  final _c = Get.put(_PetController());
  final _p = Get.find<_PetProvider>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: 1.sw,
        height: 1.sh,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Obx(() => Text('get pet: ${_c.pet.value.name}')),
            TextButton(
              child: Text('get'),
              onPressed: () {
                _c.getPet();
              },
            ),
            TextButton(
              child: Text('post'),
              onPressed: () async {
                final res = await _p.addPet('ttt');
                print('res====${res}');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _Pet {
  int? id;
  String? name;
  String? status;

  _Pet({this.id, this.name, this.status});

  _Pet.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        status = json['status'];

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> pet = <String, dynamic>{};

    pet['id'] = id;
    pet['name'] = name;
    pet['status'] = status;

    return pet;
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'Pet: {id: $id, name: $name, status: $status}';
  }
}

class _PetProvider extends GetConnect {
  @override
  void onInit() {
    httpClient.baseUrl = 'http://192.168.1.107:4523/mock/712179';
    super.onInit();
  }

  Future getPet(int petId) =>
      get('/pet/${petId}').then((res) => _Pet.fromJson(res.body['data']));

  Future addPet(String name) => post('/pet', {'name': name, 'status': 'sold'})
      .then((res) => res.body['data']);
}

class _PetController extends GetxController {
  var pet = _Pet().obs;
  final api = Get.put(_PetProvider());

  void getPet() {
    api.getPet(1).then((res) {
      if (res != null) {
        print(res);
        pet(res);
      }
    }).catchError((err) {
      print('err====${err}');
    });
  }
}
