import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_shop/api/method.dart';
import 'package:flutter_shop/model/category.dart';
import 'package:flutter_shop/model/categoryGoodsList.dart';
import 'package:flutter_shop/provide/child_category.dart';
import 'package:provider/provider.dart';

class CategoryPage extends StatefulWidget {
  const CategoryPage({Key? key}) : super(key: key);

  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('商品分类'),
      ),
      body: ChangeNotifierProvider(
        create: (context) => ChildCategory(),
        builder: (context, child) => Row(
          children: [
            const LeftCategoryNav(),
            Column(
              children: const [RightCategoryNav(), CategoryGoodsList()],
            )
          ],
        ),
      ),
    );
  }
}

class LeftCategoryNav extends StatefulWidget {
  const LeftCategoryNav({Key? key}) : super(key: key);

  @override
  _LeftCategoryNavState createState() => _LeftCategoryNavState();
}

class _LeftCategoryNavState extends State<LeftCategoryNav> {
  List<CategoryBigModel> list = [];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 180.w,
      decoration: const BoxDecoration(
          border: Border(right: BorderSide(width: 1, color: Colors.black12))),
      child: ListView.builder(
        itemBuilder: (context, index) => _leftInkWel(index, context),
        itemCount: list.length,
      ),
    );
  }

  Widget _leftInkWel(int index, BuildContext context) => InkWell(
        child: Container(
          height: 100.h,
          padding: const EdgeInsets.only(left: 10, top: 20),
          decoration: const BoxDecoration(
              color: Colors.white,
              border:
                  Border(bottom: BorderSide(width: 1, color: Colors.black12))),
          child: Text(
            list[index].mallCategoryName,
            style: TextStyle(fontSize: 28.sp),
          ),
        ),
        onTap: () {
          final childCategory = context.read<ChildCategory>();

          childCategory.getChildCategory(list[index].bxMallSubDto);
        },
      );

  @override
  void initState() {
    super.initState();
    _getCategory();
  }

  void _getCategory() async {
    var res = await get('getCategory');
    final model = CategoryBigListModel.fromJson(List<Map>.from(res));
    setState(() {
      list = model.value;
    });
  }
}

class RightCategoryNav extends StatefulWidget {
  const RightCategoryNav({Key? key}) : super(key: key);

  @override
  _RightCategoryNavState createState() => _RightCategoryNavState();
}

class _RightCategoryNavState extends State<RightCategoryNav> {
  @override
  Widget build(BuildContext context) {
    return Consumer<ChildCategory>(
      builder: (context, value, child) {
        final list = value.childCategoryList;

        return Container(
            height: ScreenUtil().setHeight(80),
            width: ScreenUtil().setWidth(570),
            decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(
                    bottom: BorderSide(width: 1, color: Colors.black12))),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: list.length,
              itemBuilder: (context, index) {
                return _rightInkWell(list[index]);
              },
            ));
      },
    );
  }

  Widget _rightInkWell(BxMallSubDto item) {
    return InkWell(
      onTap: () {},
      child: Container(
        padding: const EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
        child: Text(
          item.mallSubName,
          style: TextStyle(fontSize: ScreenUtil().setSp(28)),
        ),
      ),
    );
  }
}

class CategoryGoodsList extends StatefulWidget {
  const CategoryGoodsList({Key? key}) : super(key: key);

  @override
  _CategoryGoodsListState createState() => _CategoryGoodsListState();
}

class _CategoryGoodsListState extends State<CategoryGoodsList> {
  List<CategoryListData> list = [];

  void _getGoodList() async {
    var params = {'categoryId': '4', 'categorySubId': "", 'page': 1};
    var res = await get('getMallGoods', params);
    list = List.from(res).map((val) => CategoryListData.fromJson(val)).toList();
  }

  @override
  void initState() {
    _getGoodList();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: ScreenUtil().setWidth(570),
        height: ScreenUtil().setHeight(1000),
        child: ListView.builder(
          itemCount: list.length,
          itemBuilder: (context, index) {
            return _listWidget(index);
          },
        ));
  }

  Widget _goodsImage(index) {
    return SizedBox(
      width: ScreenUtil().setWidth(200),
      child: Image.network(list[index].image),
    );
  }

  Widget _goodsName(index) {
    return Container(
      padding: const EdgeInsets.all(5.0),
      width: ScreenUtil().setWidth(370),
      child: Text(
        list[index].goodsName,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(fontSize: ScreenUtil().setSp(28)),
      ),
    );
  }

  Widget _goodsPrice(index) {
    return Container(
        margin: const EdgeInsets.only(top: 20.0),
        width: ScreenUtil().setWidth(370),
        child: Row(children: <Widget>[
          Text(
            '价格:￥${list[index].presentPrice}',
            style:
                TextStyle(color: Colors.pink, fontSize: ScreenUtil().setSp(30)),
          ),
          Text(
            '￥${list[index].oriPrice}',
            style: const TextStyle(
                color: Colors.black26, decoration: TextDecoration.lineThrough),
          )
        ]));
  }

  Widget _listWidget(int index) {
    return InkWell(
        onTap: () {
          print('index====${list[index]}');
        },
        child: Container(
          padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
          decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(
                  bottom: BorderSide(width: 1.0, color: Colors.black12))),
          child: Row(
            children: <Widget>[
              _goodsImage(index),
              Column(
                children: <Widget>[_goodsName(index), _goodsPrice(index)],
              )
            ],
          ),
        ));
  }
}
