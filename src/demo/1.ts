interface Action<T> {
  type: string;
  payload?: T;
}
class EffectModule {
  count = 1;
  message = 'hello!';

  delay(promise: Promise<number>) {
    return promise.then((second: number) => ({
      type: 'delay',
      payload: `延迟#${second}秒`,
    }));
  }
  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    };
  }
}

// 将 EffectModule 转换成 Connected
// 1. 删除count，message

// type EffectModuleType = {
//   count: number;
//   message: string;
//   delay(promise: Promise<number>): Promise<Action<string>>;
//   setMessage(action: Action<Date>): Action<number>;
// };
// 对比
// type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;  // 老的异步方法签名 - 变成了
// type asyncMethodConnect<T, U> = (input: T) => Action<U>; // 新的异步方法签名 -  过滤后的delay方法类型

// type syncMethod<T, U> = (action: Action<T>) => Action<U>; 老的同步方法签名 -  // 变成了
// type syncMethodConnect<T, U> = (action: T) => Action<U>; 新的同步方法签名

/**
 * { count: never, message: never, delay: delay, setMessage: setMessage  }
 * 'setMessage' | 'delay' 取出方法的名称
 */
type MethodsPick<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type EffectModuleMethods = MethodsPick<EffectModule>; // delay | setMessage

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>; // 变成了
type asyncMethodConnect<T, U> = (input: T) => Action<U>; // 过滤后的delay方法类型

type syncMethod<T, U> = (action: Action<T>) => Action<U>; // 变成了
type syncMethodConnect<T, U> = (action: T) => Action<U>;

// 转换方法 将老的方法签名传进去 返回新的类型
type EffectModuleMethodConnect<T> = T extends asyncMethod<infer U, infer V>
  ? asyncMethodConnect<U, V>
  : T extends syncMethod<infer U, infer V>
  ? syncMethodConnect<U, V>
  : never;
type Connect = (module: EffectModule) => {
  //TODO
  [M in EffectModuleMethods]: EffectModuleMethodConnect<EffectModule[M]>;
};

const connect: Connect = () => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: 'hello',
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

// 方法名相同，参数名变更
type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};
let module: EffectModule = new EffectModule();
export const connected: Connected = connect(module);
