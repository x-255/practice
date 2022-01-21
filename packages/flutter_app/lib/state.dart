/*
 * @Description: 状态管理
 * @LastEditTime: 2022-01-21 17:21:11
 */

import 'package:flutter/material.dart';

// widget 管理自己的状态
class TapboxA extends StatefulWidget {
  const TapboxA({Key? key}) : super(key: key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        onTap: _handleTap,
        child: Container(
          child: Center(
            child: Text(
              _active ? 'Active' : 'Inactive',
              style: const TextStyle(fontSize: 32.0, color: Colors.white),
            ),
          ),
          width: 200.0,
          height: 200.0,
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}

/* -------------------------------------------------------------------------- */

// 父 widget 管理此 widget 的状态
class TapboxBParent extends StatefulWidget {
  const TapboxBParent({Key? key}) : super(key: key);

  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<TapboxBParent> {
  bool _active = false;

  void _handleTapboxChanged(bool val) {
    setState(() {
      _active = val;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

class TapboxB extends StatelessWidget {
  const TapboxB({Key? key, this.active = true, required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onChanged(!active);
      },
      child: Container(
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        color: active ? Colors.lightGreen[700] : Colors.grey[600],
      ),
    );
  }
}

/* -------------------------------------------------------------------------- */

// 混搭管理
class TapboxCParent extends StatefulWidget {
  const TapboxCParent({ Key? key }) : super(key: key);

  @override
  _TapboxCParentState createState() => _TapboxCParentState();
}

class _TapboxCParentState extends State<TapboxCParent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      
    );
  }
}

class TapboxC extends StatefulWidget {
  const TapboxC({ Key? key, this.count = 0 }) : super(key: key);

  final int count;
  final 

  @override
  _TapboxCState createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  @override
  Widget build(BuildContext context) {
    return Container(
      
    );
  }
}