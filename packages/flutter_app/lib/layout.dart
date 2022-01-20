/*
 * @Description: 执行基础布局操作
 * @LastEditTime: 2022-01-20 15:17:26
 */

import 'package:flutter/material.dart';

final outerColor = Colors.grey[300];
final innerColor = Colors.blue[400];
const TextStyle bold24Roboto = TextStyle(
  color: Colors.white,
  fontSize: 24,
  fontWeight: FontWeight.w900,
);

// 文本样式与对齐
class Txt extends StatelessWidget {
  const Txt({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Text(
        '文本样式与对齐',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontWeight: FontWeight.w900,
          fontSize: 24,
          fontFamily: 'Georgia',
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 设置背景颜色
class Bgc extends StatelessWidget {
  const Bgc({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Text('设置背景颜色'),
      width: 100,
      height: 100,
      // color: Colors.blue,
      decoration: const BoxDecoration(color: Colors.greenAccent),
    );
  }
}

// 居中元素
class Cen extends StatelessWidget {
  const Cen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Center(child: Text('居中元素')),
      width: 200,
      height: 200,
      color: outerColor,
    );
  }
}

// 设置容器宽度
class Wid extends StatelessWidget {
  const Wid({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Container(
          child: const Text('设置容器宽度'),
          width: 240,
          decoration: BoxDecoration(color: innerColor),
          padding: const EdgeInsets.all(16),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 设置绝对位置
class Pos extends StatelessWidget {
  const Pos({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Stack(
        children: [
          Positioned(
            child: Container(
              child: const Text('设置绝对位置'),
              decoration: BoxDecoration(
                color: innerColor,
              ),
              padding: const EdgeInsets.all(16),
            ),
            left: 24,
            top: 24,
          )
        ],
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

Matrix4 getRotate(num degree) =>
    Matrix4.identity()..rotateZ(degree * 3.14157 / 180);

// 旋转元素
class Rotating extends StatelessWidget {
  const Rotating({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Transform(
          child: const Text(
            '旋转元素',
            style: bold24Roboto,
          ),
          alignment: Alignment.center,
          transform: getRotate(30),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 缩放元素
class Zoom extends StatelessWidget {
  const Zoom({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Transform(
          child: const Text(
            '缩放元素',
            style: bold24Roboto,
          ),
          alignment: Alignment.center,
          transform: Matrix4.identity()..scale(3.0),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 圆角
class Rounding extends StatelessWidget {
  const Rounding({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Container(
          // red circle
          child: const Text(
            "圆角",
            style: bold24Roboto,
          ),
          decoration: BoxDecoration(
            color: innerColor,
            borderRadius: const BorderRadius.all(Radius.circular(10)),
          ),
          padding: const EdgeInsets.all(16),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 生成圆与椭圆
class Cir extends StatelessWidget {
  const Cir({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Container(
          child: const Center(
            child: Text(
              '圆',
              style: bold24Roboto,
            ),
          ),
          width: 100,
          height: 100,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: innerColor,
            shape: BoxShape.circle,
          ),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 内联样式更改
class InnerStyle extends StatelessWidget {
  const InnerStyle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: RichText(
          text: const TextSpan(children: [
            TextSpan(text: '内联样式'),
            TextSpan(
                text: '更改',
                style: TextStyle(
                    fontWeight: FontWeight.w300,
                    fontSize: 32,
                    fontStyle: FontStyle.italic))
          ], style: bold24Roboto),
        ),
      ),
      width: 320,
      height: 240,
      color: outerColor,
    );
  }
}

// 生成文本摘要
/* 
一个摘要会展示一个段落中文本的初始行内容，并常用省略号处理溢出的文本内容。在 HTML/CSS 中，摘录不能超过一行。在多行之后进行截断需要运行一些 JavaScript 代码。
在 Flutter 中，使用 Text widget 的 maxLines 属性来指定包含在摘要中的行数，以及 overflow 属性来处理溢出文本。
 */

class Snip extends StatelessWidget {
  const Snip({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Container(
          child: const Text(
            "Lorem ipsum dolor sit amet, consec etur",
            style: bold24Roboto,
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
          ),
          decoration: BoxDecoration(
            color: Colors.red[400],
          ),
          padding: const EdgeInsets.all(16),
        ),
      ),
      width: 320,
      height: 240,
      color: Colors.grey[300],
    );
  }
}
