import 'package:dio/dio.dart';
import 'package:flutter_shop/api/paths.dart';

Future getHomePageContent() async {
  try {
    Dio dio = Dio();
    Response res = await dio.get(apiPath['homePageContext']!);
    if (res.statusCode == 200 && res.data['code'] == 200) {
      return res.data['data'];
    } else {
      throw Exception('后端接口出现异常，请检测代码和服务器情况.........');
    }
  } catch (e) {
    print('err===$e');
  }
}
