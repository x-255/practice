import 'package:fluro/fluro.dart';
import './router_handler.dart';

class Routes {
  static String root = '/';
  static String detailsPage = '/detail';

  static void configureRoutes(FluroRouter router) {
    router.notFoundHandler = Handler(
      handlerFunc: (context, parameters) {
        print("ROUTE WAS NOT FOUND !!!");
        return;
      },
    );

    router.define(detailsPage, handler: detailsHanderl);
  }
}
