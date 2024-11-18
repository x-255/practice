import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:flutter_shop/pages/index_page.dart';
import 'package:flutter_shop/provide/cart.dart';
import 'package:flutter_shop/routers/application.dart';
import 'package:flutter_shop/routers/routes.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key) {
    final router = FluroRouter();
    Routes.configureRoutes(router);
    Application.router = router;
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => CartProvide())],
      child: Container(
        child: MaterialApp(
          title: '百姓生活+',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(primaryColor: Colors.pink),
          home: const IndexPage(),
          onGenerateRoute: Application.router.generator,
        ),
      ),
    );
  }
}
