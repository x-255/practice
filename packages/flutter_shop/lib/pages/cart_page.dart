import 'package:flutter/material.dart';
import 'package:flutter_shop/provide/cart.dart';
import 'package:provider/provider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../model/cartInfo.dart';

class CartPage extends StatelessWidget {
  const CartPage({Key? key}) : super(key: key);

  Future<String> _getCartInfo(BuildContext context) async {
    await context.read<CartProvide>().updateList();
    return 'end';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('购物车'),
        ),
        body: FutureBuilder(
          future: _getCartInfo(context),
          builder: (context, snapshot) {
            print('snapshot====${snapshot.data}');
            if (snapshot.hasData) {
              final cartList = context.read<CartProvide>().list;
              return ListView.builder(
                itemCount: cartList.length,
                itemBuilder: (context, index) {
                  return ListTile(title: Text(cartList[index].goodsName));
                },
              );
            }
            return const Text('xxxx');
          },
        ));
  }
}

class CartItem extends StatelessWidget {
  final CartInfoMode item;
  const CartItem(this.item);

  @override
  Widget build(BuildContext context) {
    print(item);
    return Container(
      margin: const EdgeInsets.fromLTRB(5.0, 2.0, 5.0, 2.0),
      padding: const EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
      decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(bottom: BorderSide(width: 1, color: Colors.black12))),
      child: Row(
        children: <Widget>[
          _cartCheckBt(item),
          _cartImage(item),
          _cartGoodsName(item),
          _cartPrice(item)
        ],
      ),
    );
  }

  //多选按钮
  Widget _cartCheckBt(item) {
    return Container(
      child: Checkbox(
        value: true,
        activeColor: Colors.pink,
        onChanged: (val) {},
      ),
    );
  }

  //商品图片
  Widget _cartImage(item) {
    return Container(
      width: ScreenUtil().setWidth(150),
      padding: const EdgeInsets.all(3.0),
      decoration:
          BoxDecoration(border: Border.all(width: 1, color: Colors.black12)),
      child: Image.network(item.images),
    );
  }

  //商品名称
  Widget _cartGoodsName(item) {
    return Container(
      width: ScreenUtil().setWidth(300),
      padding: const EdgeInsets.all(10),
      alignment: Alignment.topLeft,
      child: Column(
        children: <Widget>[Text(item.goodsName)],
      ),
    );
  }

  //商品价格
  Widget _cartPrice(item) {
    return Container(
      width: ScreenUtil().setWidth(150),
      alignment: Alignment.centerRight,
      child: Column(
        children: <Widget>[
          Text('￥${item.price}'),
          Container(
            child: InkWell(
              onTap: () {},
              child: const Icon(
                Icons.delete_forever,
                color: Colors.black26,
                size: 30,
              ),
            ),
          )
        ],
      ),
    );
  }
}
