// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'details.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DetailsModel _$DetailsModelFromJson(Map<String, dynamic> json) => DetailsModel(
      goodsId: json['goodsId'] as String,
      goodsName: json['goodsName'] as String,
      price: json['price'] as num,
      images: json['images'] as String,
    );

Map<String, dynamic> _$DetailsModelToJson(DetailsModel instance) =>
    <String, dynamic>{
      'goodsId': instance.goodsId,
      'goodsName': instance.goodsName,
      'price': instance.price,
      'images': instance.images,
    };
