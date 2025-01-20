function addTimesstamp<T extends new(...args: any[]) => {}>(target: T): T {
  return class extends target {
    timestamp = Date.now();
  }
}

interface User {
  timestamp: number;
}

@addTimesstamp
class User {}


const user = new User();
console.log(user.timestamp);