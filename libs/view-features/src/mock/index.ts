import type { ContextState } from '../MessageContext';
import rawComponentData from './mock-manifest.json';

const mockComponentData = rawComponentData as unknown as ContextState;

export { mockComponentData };
