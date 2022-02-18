import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/api/method.dart';
import 'package:flutter_shop/model/details.dart';
import 'package:flutter_shop/provide/cart.dart';
import 'package:provider/provider.dart';

class DetailsPage extends StatefulWidget {
  final goodsId;

  const DetailsPage(this.goodsId, {Key? key}) : super(key: key);

  @override
  _DetailsPageState createState() => _DetailsPageState();
}

class _DetailsPageState extends State<DetailsPage> {
  late DetailsModel data;

  void _getGoodsInfo() async {
    final res = await get('getGoodDetailById', {'goodsId': widget.goodsId});
    setState(() {
      data = DetailsModel.fromJson(res);
    });
  }

  @override
  void initState() {
    super.initState();
    _getGoodsInfo();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('详情'),
      ),
      body: Stack(
        fit: StackFit.expand,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                height: 100.h,
              ),
              Image.network(data.images),
              Text(data.goodsName),
            ],
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      final cartProvider = context.read<CartProvide>();
                      cartProvider.add(
                        goodsId: data.goodsId,
                        goodsName: data.goodsName,
                        price: data.price,
                        images: data.images,
                        count: 1,
                      );
                    },
                    child: const Text('加入购物车'),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
