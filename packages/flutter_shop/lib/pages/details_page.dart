import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/api/method.dart';
import 'package:flutter_shop/model/details.dart';

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
    data = DetailsModel.fromJson(res);
    print('data====${data}');
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
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Text('')],
          )
        ],
      ),
    );
  }
}
