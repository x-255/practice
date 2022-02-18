import 'package:json_annotation/json_annotation.dart';

part 'details.g.dart';

@JsonSerializable()
class DetailsModel {
  DetailsModel({
    required this.goodsId,
    required this.goodsName,
    required this.price,
    required this.images,
  });

  String goodsId;
  String goodsName;
  num price;
  String images;

  factory DetailsModel.fromJson(Map<String, dynamic> json) =>
      _$DetailsModelFromJson(json);

  Map<String, dynamic> toJson() => _$DetailsModelToJson(this);

  @override
  String toString() {
    return '''
DetailsModel: {
  goodsId: $goodsId,
  goodsName: $goodsName,
  price: $price,
  images: $images,
}
''';
  }
}
