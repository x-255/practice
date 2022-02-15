class CategoryGoodsListModel {
  String code;
  String message;
  List<CategoryListData> data;

  CategoryGoodsListModel(
      {required this.code, required this.message, required this.data});

  CategoryGoodsListModel.fromJson(Map<String, dynamic> json)
      : code = json['code'],
        message = json['message'],
        data = json['data'] == null
            ? []
            : List.from(json['data'])
                .map((val) => CategoryListData.fromJson(val))
                .toList();

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};

    data['code'] = code;
    data['message'] = message;
    data['data'] = this.data.map((v) => v.toJson()).toList();

    return data;
  }
}

class CategoryListData {
  String image;
  num oriPrice;
  num presentPrice;
  String goodsName;
  String goodsId;

  CategoryListData(
      {required this.image,
      required this.oriPrice,
      required this.presentPrice,
      required this.goodsName,
      required this.goodsId});

  CategoryListData.fromJson(Map<String, dynamic> json)
      : image = json['image'],
        oriPrice = json['oriPrice'],
        presentPrice = json['presentPrice'],
        goodsName = json['goodsName'],
        goodsId = json['goodsId'];

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['image'] = image;
    data['oriPrice'] = oriPrice;
    data['presentPrice'] = presentPrice;
    data['goodsName'] = goodsName;
    data['goodsId'] = goodsId;
    return data;
  }

  @override
  String toString() {
    return '''
CategoryListData: {
  image: $image,
  oriPrice: $oriPrice,
  presentPrice: $presentPrice,
  goodsName: $goodsName,
  goodsId: $goodsId,
}
''';
  }
}
