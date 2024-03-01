package demo.oop;

public class Phone {
  String name;
  double price;

  public void call() {
    System.out.println("Calling...");
  }

  public String call(String name) {
    return "Calling...";
  }

  public void call(int name) {
  }
}
