import 'package:flutter/cupertino.dart';

Color hex2color(String hex) {
  final hexStr = hex.startsWith('#') ? hex.substring(1) : hex;
  final n = int.parse(hexStr, radix: 16);

  return Color(n + 0xFF000000);
}
