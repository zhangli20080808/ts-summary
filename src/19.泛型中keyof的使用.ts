interface Person {
  name: string;
  age: number;
  gender: string;
}
class Teacher {
  constructor(public info: Person) {}

  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({ name: 'zl', age: 20, gender: '男' });
const res = teacher.getInfo('age');

//复杂场景 keyof 和 infer解决复杂的泛型问题
interface Action<T> {
  type: string;
  payload?: T;
}
class FoodModule {
  public static topic: string;
  public count!: number;
  delay(promise: Promise<number>) {
    return promise.then((second: number) => ({
      type: 'delay',
      payload: `延迟#${second}秒`,
    }));
  }
  searchFoodByCity(action: Action<string>) {
    return {
      payload: action.payload,
      type: 'searchFoodByCity',
    };
  }
}
// 实现1 - FoodModule 参数类型和返回值类型被部分过滤，如下
type asyncMethodConnect<T, U> = (input: T) => Action<U>; // 过滤后的delay方法类型
type syncMethodConnect<T, U> = (action: T) => Action<U>; // 过滤后的delay方法类型

// 实现2 - 把这两个类型和原来的FoodModule类合并成如下对象
type Convert = () => {
  delay: asyncMethodConnect<number, string>;
  searchFoodByCity: syncMethodConnect<string, string>;
};

export {};
