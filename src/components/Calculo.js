export default function returnFunc(val) {
    switch (val) {
      case '+':
        // Error here because a and b are strings. 
        // Convert them to numbers first to add their values *
        return function sum(a,b) { return a+b}; 
      case '-':
        return function subtract(a,b) { return a-b};
      case '*':
        return function multiply(a,b) { return a*b};
      case '/':
        return function divide(a,b) {return a/b};
      default: // <- Use default case
        throw new Error("Called with unknown operator " + val);
    }
  }