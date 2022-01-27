import 'dart:convert';
import 'package:json_annotation/json_annotation.dart';
import 'package:flutter/material.dart';
part 'json.g.dart';

class MyJson extends StatelessWidget {
  const MyJson({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const str =
        '''
          {
            "name": "John Smith",
            "email": "john@example.com"
          }
        ''';

    var userMap = jsonDecode(str);
    var user = User.fromJson(userMap);

    print(user.username);

    return Container();
  }
}

/* --------------------------- 手动在模型类中序列化 JSON 数据 --------------------------- */
/* class User {
  final String name;
  final String email;

  User(this.name, this.email);

  User.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        email = json['email'];

  Map<String, dynamic> toJson() => {
        'name': name,
        'email': email,
      };
} */

/* --------------------------- 使用代码生成库序列化 JSON 数据 --------------------------- */
@JsonSerializable()
class User {
  User(this.username, this.email);

  @JsonKey(name: 'name')
  String username;
  String email;

  /// A necessary factory constructor for creating a new User instance
  /// from a map. Pass the map to the generated `_$UserFromJson()` constructor.
  /// The constructor is named after the source class, in this case, User.
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$UserToJson`.
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
