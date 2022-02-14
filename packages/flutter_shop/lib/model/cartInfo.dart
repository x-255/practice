class CartInfoMode {
  String goodsId;
  String goodsName;
  int count;
  double price;
  String images;

  CartInfoMode(
      {required this.goodsId,
      required this.goodsName,
      required this.count,
      required this.price,
      required this.images});

  CartInfoMode.fromJson(Map<String, dynamic> json)
      : goodsId = json['goodsId'],
        goodsName = json['goodsName'],
        count = json['count'],
        price = json['price'],
        images = json['images'];

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};

    data['goodsId'] = goodsId;
    data['goodsName'] = goodsName;
    data['count'] = count;
    data['price'] = price;
    data['images'] = images;

    return data;
  }

  @override
  String toString() {
    return '''
      CartInfoMode: {
        goodsId: $goodsId,
        goodsName: $goodsName,
        count: $count,
        price: $price,
        images: $images,
      }
    ''';
  }
}
