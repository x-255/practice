import 'package:fluro/fluro.dart';
import 'package:flutter_shop/pages/details_page.dart';

Handler detailsHanderl = Handler(
  handlerFunc: (context, params) {
    String goodsId = params['id']!.first;
    return DetailsPage(goodsId);
  },
);
