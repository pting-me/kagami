import { describe, expect, it } from 'vitest';

import { mockComponentData } from '../mock';
import {
  pascalCase,
  serializeProperties,
  valuesAreNumbers,
} from './generateCode';

describe('generateCode', () => {
  it('pascalCase', () => {
    expect(pascalCase('foo')).toBe('Foo');
    expect(pascalCase('Bar')).toBe('Bar');
    expect(pascalCase('foo bar baz')).toBe('FooBarBaz');
  });
  it('valuesAreNumbers', () => {
    const areNotNumbers = ['001', '1f', 'orly?'];
    // it.each not working for some unknown reason
    areNotNumbers.forEach((notNumber) => {
      expect(valuesAreNumbers([notNumber])).toBeFalsy();
    });
    const areNumbers = ['0', '1'];
    areNumbers.forEach((number) => {
      expect(valuesAreNumbers([number])).toBeTruthy();
    });
  });
  it('serializeProperties', () => {
    const { variantProperties } = mockComponentData.componentSetNodes[0]
      .children[0] as ComponentNode;
    const [key, value] = Object.entries(variantProperties ?? {})[0];
    expect(serializeProperties(variantProperties)).toContain(
      String(key).toLowerCase()
    );
    expect(serializeProperties(variantProperties)).toContain(
      String(value).toLowerCase()
    );
  });
});
