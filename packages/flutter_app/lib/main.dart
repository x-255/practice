// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_app/keep_alive.dart';

void main() => runApp(const App());

// 对应name_routes
/* void main() => runApp(MaterialApp(
      title: 'Named Route',
      initialRoute: '/',
      routes: {
        '/': (ctx) => const FirstScreen(),
        '/two': (ctx) => const SecondScreen()
      },
    )); */

// 对应specific
/* void main() => runApp(MaterialApp(
      title: 'Specific Route',
      initialRoute: '/',
      routes: {
        '/': (c) => const SPage(),
        ExtractArgumentsScreen.routeName: (c) => const ExtractArgumentsScreen()
      },
      onGenerateRoute: (settings) {
        if (settings.name == PassArgumentsScreen.routeName) {
          final args = settings.arguments as ScreenArguments;
          return MaterialPageRoute(
              builder: (c) => PassArgumentsScreen(
                    title: args.title,
                    message: args.message,
                  ));
        }
      },
    )); */

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'flutter demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const KeepAliveDemo(),
    );
  }
}
