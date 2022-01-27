import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Counter extends ChangeNotifier {
  int value = 0;

  void add() {
    value++;
    notifyListeners();
  }
}

class MyProviderRoot extends StatelessWidget {
  const MyProviderRoot({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (c) => Counter(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: const [
          MyProviderCh1(),
          SizedBox(
            height: 30,
          ),
          MyProviderCh2(),
        ],
      ),
    );
  }
}

class MyProviderCh1 extends StatelessWidget {
  const MyProviderCh1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (ctx, counter, child) => Text('${counter.value}'),
    );
  }
}

class MyProviderCh2 extends StatelessWidget {
  const MyProviderCh2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      child: const Icon(Icons.add),
      onPressed: () {
        // 方式一
        var counter = context.read<Counter>();
        counter.add();

        // 方式二
        // var counter = Provider.of<Counter>(context, listen: false);
        // counter.add();
      },
    );
  }
}
