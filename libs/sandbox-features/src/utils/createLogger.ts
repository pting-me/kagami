interface Environment {
  production: boolean;
}

const createLogger = (environment: Environment) => {
  const { production } = environment;

  if (production) {
    const noop = () => {
      /* do nothing */
    };

    const fakeConsole: Record<string, unknown> = {};
    const fnsToFake: (keyof typeof console)[] = ['debug', 'log'];

    fnsToFake.forEach((prop) => {
      fakeConsole[prop] = noop;
    });

    return { ...console, ...fakeConsole } as typeof console;
  }

  return console;
};

export default createLogger;
