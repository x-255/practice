class CategoryBigModel {
  String mallCategoryId; //类别编号
  String mallCategoryName; //类别名称
  List<BxMallSubDto> bxMallSubDto; //小类列表
  String image; //类别图片
  String comments; //列表描述

  CategoryBigModel(
      {required this.mallCategoryId,
      required this.mallCategoryName,
      required this.comments,
      required this.image,
      required this.bxMallSubDto});

  CategoryBigModel.fromJson(Map<String, dynamic> json)
      : mallCategoryId = json['mallCategoryId'],
        mallCategoryName = json['mallCategoryName'],
        comments = json['comments'],
        image = json['image'],
        bxMallSubDto = List<Map<String, dynamic>>.from(json['bxMallSubDto'])
            .map((val) => BxMallSubDto.fromJson(val))
            .toList();

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};

    json['mallCategoryId'] = mallCategoryId;
    json['mallCategoryName'] = mallCategoryName;
    json['comments'] = comments;
    json['image'] = image;
    json['bxMallSubDto'] = bxMallSubDto;

    return json;
  }
}

class CategoryBigListModel {
  CategoryBigListModel(this.value);

  List<CategoryBigModel> value;

  factory CategoryBigListModel.fromJson(List json) => CategoryBigListModel(
      json.map((val) => CategoryBigModel.fromJson(val)).toList());
}

class BxMallSubDto {
  String mallSubId;
  String mallCategoryId;
  String mallSubName;
  String comments;

  BxMallSubDto(
      {required this.mallSubId,
      required this.mallCategoryId,
      required this.mallSubName,
      required this.comments});

  BxMallSubDto.fromJson(Map<String, dynamic> json)
      : mallSubId = json['mallSubId'],
        mallCategoryId = json['mallCategoryId'],
        mallSubName = json['mallSubName'],
        comments = json['comments'];

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    json['mallSubId'] = mallSubId;
    json['mallCategoryId'] = mallCategoryId;
    json['mallSubName'] = mallSubName;
    json['comments'] = comments;
    return json;
  }

  @override
  String toString() {
    return '''
BxMallSubDto: {
  mallSubId: $mallSubId,
  mallCategoryId: $mallCategoryId,
  mallSubName: $mallSubName,
  comments: $comments,
}
''';
  }
}
