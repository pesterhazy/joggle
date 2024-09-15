type JoggleExpression = boolean | number | string | [string, ...JoggleExpression[]];
type Environment = Record<string, (...args: any[]) => any>;

export function evalJoggle(expression: JoggleExpression, env: Environment = {}): any {
  if (typeof expression === 'boolean' || typeof expression === 'number' || typeof expression === 'string') {
    return expression;
  }
  
  if (Array.isArray(expression)) {
    if (expression.length === 0) {
      throw new Error('Invalid expression');
    }

    const [operator, ...args] = expression;
    
    switch (operator) {
      case 'or':
        return Boolean(evalJoggle(args[0], env)) || Boolean(evalJoggle(args[1], env));
      case 'and':
        return Boolean(evalJoggle(args[0], env)) && Boolean(evalJoggle(args[1], env));
      case 'identity':
        return evalJoggle(args[0], env);
      case 'eq':
        return evalJoggle(args[0], env) === evalJoggle(args[1], env);
      case 'not':
        return !Boolean(evalJoggle(args[0], env));
      default:
        if (operator in env) {
          return env[operator](...args.map(arg => evalJoggle(arg, env)));
        }
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
  
  throw new Error('Invalid expression');
}
