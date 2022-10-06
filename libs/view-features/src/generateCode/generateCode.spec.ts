import { describe, expect, it, vi } from 'vitest';

import { mockComponentData } from '../mock';
import {
  mapProperties,
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
  it('mapProperties', () => {
    const { variantGroupProperties } = mockComponentData.componentSetNodes[0];
    const propertyMap = mapProperties(
      mockComponentData.componentSetNodes[0].variantGroupProperties
    );

    expect(propertyMap.length).toBe(
      Object.entries(variantGroupProperties).length
    );

    // TODO add other logic
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
    expect(serializeProperties(variantProperties)).toBe(
      '--icon-false--size-default--variant-default'
    );
  });
});
