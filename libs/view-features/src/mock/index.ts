import type { ContextState } from '../components/ViewContext';
import rawComponentData from './context.json';

const mockComponentData = rawComponentData as unknown as ContextState;

export { mockComponentData };
