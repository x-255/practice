import 'package:dio/dio.dart';
import 'package:flutter_shop/api/paths.dart';

Future<T> request<T>(String path,
    {String? method,
    Map<String, dynamic>? queryParameters,
    dynamic data}) async {
  Dio dio = Dio();
  final url = apiPath[path] ?? '404';
  var fn = method == 'post'
      ? () => dio.post<T>(url, data: data)
      : () => dio.get<T>(url, queryParameters: queryParameters);
  Response res = await fn();

  if (res.statusCode == 200 && res.data['code'] == 200) {
    return res.data['data'];
  } else {
    throw Exception('后端接口出现异常，请检测代码和服务器情况.........');
  }
}

Future<T> get<T>(String url, [Map<String, dynamic>? queryParameters]) =>
    request<T>(url, method: 'get', queryParameters: queryParameters);

Future<T> post<T>(String url, [data]) =>
    request<T>(url, method: 'post', data: data);
