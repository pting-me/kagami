/**
 * Copied from plugin-api under ComponentSetNode
 */
export type VariantProperties = {
  [property: string]: string;
} | null;

export interface ChildNodePropTemplateData {
  name: string;
  figmaNodeType: BaseNode["type"]; // comes from SceneNode
  reactTsType: string; // calculated from figmaNodeType
}

export interface VariantPropTemplateData {
  name: string;
  required: boolean;
  defaultValue: string;
  reactTsType: string;
}

export interface ComponentTemplateData {
  serial: string;
  style: string;
  children: ComponentChildTemplateData[];
  shouldRenderInFragment: boolean;
}

export interface ComponentChildTemplateData {
  name: string;
  figmaNodeType: BaseNode["type"]; // comes from SceneNode
  style: string;
  defaultValue: string;
}

export interface TemplateData {
  childNodeProps: ChildNodePropTemplateData[];
  variantProps: VariantPropTemplateData[];
  components: ComponentTemplateData[];
  name: string;
  isForwardRef: boolean;
  elementTypeName: string;
  tagName: string;
}
