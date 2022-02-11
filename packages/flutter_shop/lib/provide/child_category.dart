import 'package:flutter/cupertino.dart';
import 'package:flutter_shop/model/category.dart';

class ChildCategory with ChangeNotifier {
  List<BxMallSubDto> childCategoryList = [];

  getChildCategory(List<BxMallSubDto> list) {
    childCategoryList = list;
    notifyListeners();
  }
}
