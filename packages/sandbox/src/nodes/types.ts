import { componentProps, componentSetProps } from "./hydrationProps";

export type Dry<N extends BaseNode> = Pick<N, "id"> & Partial<N>;

export type DryBaseNode = Dry<BaseNode>;
export type DryComponentNode = Dry<ComponentNode>;
export type DryComponentSetNode = Dry<ComponentSetNode>;

export type HydratedComponentNode = {
  [Prop in (typeof componentProps)[number]]: ComponentNode[Prop];
} & Pick<ComponentNode, "id">;

export type HydratedComponentSetNode = {
  [Prop in (typeof componentSetProps)[number]]: ComponentSetNode[Prop];
} & Pick<ComponentSetNode, "id">;
