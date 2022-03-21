import 'package:flutter/material.dart';
import 'package:flutter_demo/components/base/button.dart';
import 'package:flutter_demo/components/base/form.dart';
import 'package:flutter_demo/components/base/icon.dart';
import 'package:flutter_demo/components/base/image.dart';
import 'package:flutter_demo/components/base/progress.dart';
import 'package:flutter_demo/components/base/switch_checkbox.dart';
import 'package:flutter_demo/components/base/text.dart';
import 'package:flutter_demo/components/base/text_field.dart';
import 'package:flutter_demo/components/container/fitted_box.dart';
import 'package:flutter_demo/components/container/scaffold.dart';
import 'package:flutter_demo/components/layout/layout_builder.dart';
import 'package:flutter_demo/components/layout/stack.dart';
import 'package:flutter_demo/components/container/transform.dart';
import 'package:flutter_demo/components/scrollable/animated_list.dart';
import 'package:flutter_demo/components/scrollable/grid_view.dart';
import 'package:flutter_demo/components/scrollable/list_view.dart';
import 'package:flutter_demo/components/scrollable/scroll_controller.dart';
import 'package:flutter_demo/components/scrollable/single_child_scroll_view.dart';
import 'package:flutter_demo/demos/bindings.dart';
import 'package:flutter_demo/demos/connect.dart';
import 'package:flutter_demo/demos/count.dart';
import 'package:flutter_demo/demos/local_state.dart';
import 'package:flutter_demo/demos/middleware.dart';
import 'package:flutter_demo/demos/modal.dart';
import 'package:flutter_demo/demos/pages.dart';
import 'package:flutter_demo/demos/theme.dart';
import 'package:flutter_demo/demos/tr.dart';
import 'package:flutter_demo/demos/user.dart';
import 'package:flutter_demo/router/router.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

void main() {
  // AutoSizeUtil.setStandard(360,isAutoTextSize: true);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  final zh = const Locale('zh', 'CN');

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: Routes.initial,
      getPages: Routes.routes,
      translations: Messages(),
      locale: zh,
      fallbackLocale: zh,
    );
  }
}

class MyHome extends StatelessWidget {
  const MyHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(
        BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width,
            maxHeight: MediaQuery.of(context).size.height),
        designSize: const Size(750, 1334),
        context: context,
        minTextAdapt: true,
        orientation: Orientation.portrait);

    return GridViewDemo();
  }
}
