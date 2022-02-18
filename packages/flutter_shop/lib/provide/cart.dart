import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter_shop/model/cartInfo.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartProvide with ChangeNotifier {
  final _key = 'cartInfo';
  List<CartInfoMode> list = [];

  void add({goodsId, goodsName, int count = 1, price, images}) {
    bool isHave = false;

    for (var item in list) {
      if (item.goodsId == goodsId) {
        item.count += count;
        isHave = true;
        break;
      }
    }

    if (!isHave) {
      final good = CartInfoMode.fromJson({
        'goodsId': goodsId,
        'goodsName': goodsName,
        'count': count,
        'price': price,
        'images': images,
      });
      list.add(good);
    }

    notifyListeners();
    updatePrefs();
  }

  Future<SharedPreferences> getPrefs() => SharedPreferences.getInstance();

  String getCartStr() {
    final jsonList = list.map((val) => val.toJson()).toList();
    return jsonEncode(jsonList);
  }

  Future<void> updateList() async {
    final prefs = await getPrefs();
    final str = await prefs.getString(_key) ?? '[]';
    List jsonList = jsonDecode(str);
    list = jsonList.map((val) => CartInfoMode.fromJson(val)).toList();
  }

  Future<void> updatePrefs() async {
    final prefs = await getPrefs();
    prefs.setString(_key, getCartStr());
  }
}
