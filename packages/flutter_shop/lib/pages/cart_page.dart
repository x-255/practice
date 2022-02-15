import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/model/cartInfo.dart';
import 'package:flutter_shop/provide/cart.dart';
import 'package:provider/provider.dart';

class CartPage extends StatelessWidget {
  const CartPage({Key? key}) : super(key: key);

  Future _getCartInfo(BuildContext context) async {
    final cartProvide = context.read<CartProvide>();
    await cartProvide.updateList();
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('购物车'),
      ),
      body: FutureBuilder(
        future: _getCartInfo(context),
        builder: (context, snapshot) {
          List cartList = context.read<CartProvide>().list;

          if (snapshot.hasData) {
            return Stack(
              children: <Widget>[
                ListView.builder(
                  itemCount: cartList.length,
                  itemBuilder: (context, index) {
                    return CartItem(cartList[index]);
                  },
                ),
              ],
            );
          } else {
            return Text('正在加载');
          }
        },
      ),
    );
  }
}

class CartItem extends StatelessWidget {
  final CartInfoMode item;
  CartItem(this.item);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(5.0, 2.0, 5.0, 2.0),
      padding: const EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
      decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(bottom: BorderSide(width: 1, color: Colors.black12))),
      child: Row(
        children: [
          _cartCheckBt(item),
          _cartImage(item),
          _cartGoodsName(item),
          _cartPrice(item)
        ],
      ),
    );
  }

  Widget _cartCheckBt(item) {
    return Checkbox(
      value: true,
      activeColor: Colors.pink,
      onChanged: (val) {},
    );
  }

  Widget _cartImage(item) {
    return Container(
      width: 150.w,
      padding: const EdgeInsets.all(3.0),
      decoration:
          BoxDecoration(border: Border.all(width: 1, color: Colors.black12)),
      child: Image.network(item.images),
    );
  }

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

  Widget _cartPrice(item) {
    return Container(
      width: ScreenUtil().setWidth(150),
      alignment: Alignment.centerRight,
      child: Column(
        children: <Widget>[
          Text('￥${item.price}'),
          InkWell(
            onTap: () {},
            child: const Icon(
              Icons.delete_forever,
              color: Colors.black26,
              size: 30,
            ),
          )
        ],
      ),
    );
  }
}
