import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    type GlobalExpectType = typeof expect;
    interface ExpectStatic extends GlobalExpectType {}
  }
}
