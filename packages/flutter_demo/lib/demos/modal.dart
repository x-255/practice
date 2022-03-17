import 'package:flutter/material.dart';
import 'package:flutter_demo/components/flexCenter.dart';
import 'package:get/get.dart';

class ModalDemo extends StatelessWidget {
  const ModalDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlexCenter([
        _snackBar(),
        _defaultDialog(),
        _bottomSheet(),
      ]),
    );
  }

  Widget _snackBar() => ElevatedButton(
        child: const Text('snackBar'),
        onPressed: () {
          Get.snackbar(
            "Hey i'm a Get SnackBar!", // title
            "It's unbelievable! I'm using SnackBar without context, without boilerplate, without Scaffold, it is something truly amazing!", // message
            icon: const Icon(Icons.alarm),
            shouldIconPulse: true,
            onTap: (bar) {
              print(bar.icon);
            },
            barBlur: 20,
            isDismissible: true,
            duration: const Duration(seconds: 3),
          );
        },
      );

  Widget _defaultDialog() => ElevatedButton(
        child: const Text('defaultDialog'),
        onPressed: () {
          Get.defaultDialog(
            middleText: "Dialog made in 3 lines of code",
            textConfirm: '确定',
            confirmTextColor: Colors.white,
            content: Column(
              children: const [
                Text('111'),
                Text('222'),
                Text('333'),
              ],
            ),
            onConfirm: Get.back,
          );
        },
      );

  Widget _bottomSheet() => ObxValue<RxString>(
      (state) => ElevatedButton(
            child: Text('bottomSheet value: ${state.value}'),
            onPressed: () {
              Get.bottomSheet(Container(
                child: Wrap(
                  children: <Widget>[
                    ListTile(
                        leading: Icon(Icons.music_note),
                        title: Text('Music'),
                        onTap: () {
                          state('Music');
                          Get.back();
                        }),
                    ListTile(
                      leading: Icon(Icons.videocam),
                      title: Text('Video'),
                      onTap: () {
                        state('Video');
                        Get.back();
                      },
                    ),
                  ],
                ),
              ));
            },
          ),
      'none'.obs);
}
