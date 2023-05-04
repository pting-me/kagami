import { CSSProperties } from "react";

import {
  HtmlElementTag,
  htmlElementTagNameMap,
  SvgElementTag,
  svgElementTagNameMap,
} from "@kagami/common";

import { createReactTs } from "./createReactTs";
import {
  ChildNodePropTemplateData,
  ComponentChildTemplateData,
  ComponentTemplateData,
  TemplateData,
  VariantProperties,
  VariantPropTemplateData,
} from "./types";
import { camel, pascal } from "./utils";

export const valuesAreNumbers = (values: string[]) => {
  return values.reduce(
    (acc, value) => acc && String(Number(value)) === value,
    true
  );
};

export const valuesHaveDefault = (values: string[]) => {
  return values.reduce(
    (acc, value) => acc || value.toLowerCase() === "default",
    false
  );
};

export const valuesAreBooleans = (values: string[]) => {
  if (values.length !== 2) {
    return false;
  }

  const lowerCaseValues = values.map((value) => value.toLowerCase());

  if (lowerCaseValues.includes("true") && lowerCaseValues.includes("false")) {
    return true;
  }

  return false;
};

export const serializeProperties = (variantProperties: VariantProperties) => {
  if (!variantProperties) {
    return "";
  }

  const sortedProperties = Object.entries(variantProperties).sort(
    ([aKey], [bKey]) => {
      return aKey.localeCompare(bKey);
    }
  );

  return sortedProperties.reduce(
    (str, [currKey, currVal]) =>
      `${str.toLowerCase()}--${currKey.toLowerCase()}-${currVal.toLowerCase()}`,
    ""
  );
};

const hasCornerMixin = (
  node: SceneNode
): node is SceneNode & RectangleCornerMixin => {
  return (node as SceneNode & RectangleCornerMixin).topLeftRadius !== undefined;
};

const getBorderRadius = (node: SceneNode) => {
  if (!hasCornerMixin(node)) {
    return "";
  }

  const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } =
    node;
  return `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;
};

const hasFillsMixin = (
  node: SceneNode
): node is SceneNode & MinimalFillsMixin => {
  const fillsType = typeof (node as SceneNode & MinimalFillsMixin).fills;
  return fillsType !== "undefined" && fillsType !== "symbol";
};

const getFillColor = (node: SceneNode) => {
  if (!hasFillsMixin(node) || typeof node.fills === "symbol") {
    return "";
  }

  const visibleFills = (node.fills ?? []).filter(({ visible }) => visible);
  if (visibleFills.length === 0) {
    return "";
  }

  // TODO add support for multiple layers
  // TODO add support for other fill types
  const firstFill = visibleFills[0];
  if (firstFill.type !== "SOLID") {
    return "";
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstFill;

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${opacity ?? 1})`;
};

const hasIndividualStrokesMixin = (
  node: SceneNode
): node is SceneNode & IndividualStrokesMixin => {
  return (
    (node as SceneNode & IndividualStrokesMixin).strokeTopWeight !== undefined
  );
};

const getBorderWidth = (node: SceneNode) => {
  if (!hasIndividualStrokesMixin(node)) {
    return "";
  }

  const {
    strokeTopWeight = 0,
    strokeRightWeight = 0,
    strokeBottomWeight = 0,
    strokeLeftWeight = 0,
  } = node;
  return `${strokeTopWeight}px ${strokeRightWeight}px ${strokeBottomWeight}px ${strokeLeftWeight}px`;
};

const hasMinimalStrokesMixin = (
  node: SceneNode
): node is SceneNode & MinimalStrokesMixin => {
  const strokesType = typeof (node as SceneNode & MinimalStrokesMixin).strokes;
  return strokesType !== "undefined" && strokesType !== "symbol";
};

const getBorder = (node: SceneNode) => {
  if (!hasMinimalStrokesMixin(node)) {
    return { borderStyle: "", borderColor: "" };
  }

  const visibleStrokes = (node.strokes ?? []).filter(({ visible }) => visible);
  if (visibleStrokes.length === 0) {
    return { borderStyle: "none", borderColor: "initial" };
  }

  // TODO add support for multiple layers
  // TODO add support for other background types(?)
  const firstStroke = visibleStrokes[0];
  if (firstStroke.type !== "SOLID") {
    return { borderStyle: "none", borderColor: "initial" };
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstStroke;

  return {
    borderStyle: "solid",
    borderColor: `rgba(${Math.round(r * 255)},${Math.round(
      g * 255
    )},${Math.round(b * 255)},${opacity ?? 1});`,
  };
};

const hasBaseFrameMixin = (
  node: SceneNode
): node is SceneNode & BaseFrameMixin => {
  return (node as SceneNode & BaseFrameMixin).paddingTop !== undefined;
};

const isTextNode = (node: SceneNode): node is TextNode => {
  return node.type === "TEXT";
};

const getLineHeight = (lineHeight: LineHeight | symbol) => {
  if (typeof lineHeight === "symbol") {
    return "";
  }

  if (lineHeight.unit === "AUTO") {
    return "normal";
  }

  const unit = lineHeight.unit === "PIXELS" ? "px" : "%";

  return `${lineHeight.value}${unit}`;
};

const getFont = (node: SceneNode) => {
  if (!isTextNode(node)) {
    return { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: "" };
  }

  const fontFamily =
    typeof node.fontName === "symbol"
      ? "sans-serif"
      : `${node.fontName.family}, sans-serif`;

  const fontSize =
    typeof node.fontSize === "symbol" ? "" : `${node.fontSize}px`;
  const fontWeight =
    typeof node.fontWeight === "symbol" ? "" : String(node.fontWeight);

  const lineHeight = getLineHeight(node.lineHeight);

  return { fontFamily, fontSize, fontWeight, lineHeight };
};

interface ComputeStyleOptions {
  baseStyle: CSSProperties;
  boxStyle: CSSProperties;
  type: SceneNode["type"];
}

const computeStyle = (options: ComputeStyleOptions) => {
  const { baseStyle, boxStyle, type } = options;
  if (type === "TEXT") {
    return JSON.stringify(baseStyle);
  }

  return JSON.stringify({ ...baseStyle, ...boxStyle });
};

const computeDefaultValue = (node: SceneNode) => {
  if (node.type === "TEXT") {
    return `'${node.characters}'`;
  }

  if (node.type === "INSTANCE") {
    return `
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
    `;
  }

  return "";
};

interface GetChildNodesOptions {
  node: ComponentNode;
  registeredNames: string[];
}

const getComponentChildren = (options: GetChildNodesOptions) => {
  const { node, registeredNames: baseRegisteredNames } = options;
  const { children } = node;

  if (!children?.length) {
    return [];
  }

  // Array.map creates a new array so we don't have to worry
  // about altering content
  const registeredNames = baseRegisteredNames.map(camel);

  return children.map((childNode) => {
    const { name, type } = childNode;
    const { borderColor, borderStyle } = getBorder(childNode);
    const { fontFamily, fontSize, fontWeight, lineHeight } = getFont(childNode);

    // Get rid of property name conflicts
    let flag = 0;
    let newName = camel(name);

    if (registeredNames.includes(newName)) {
      newName += pascal(type);
    }

    while (registeredNames.includes(newName)) {
      newName = `${newName}${flag ? flag : ""}`;
      flag++;
      if (flag > 99) {
        throw new Error("Too many conflicting names");
      }
    }

    registeredNames.push(newName);

    const baseStyle: CSSProperties = {
      borderRadius: getBorderRadius(childNode),
      color: getFillColor(childNode),
      borderWidth: getBorderWidth(node),
      borderColor: borderColor,
      borderStyle: borderStyle,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    };

    const boxStyle: CSSProperties = {
      width: `${childNode.width}px`,
      height: `${childNode.height}px`,
    };

    const child: ComponentChildTemplateData = {
      name: newName,
      figmaNodeType: type,
      style: computeStyle({ baseStyle, boxStyle, type }),
      defaultValue: computeDefaultValue(childNode),
    };

    return child;
  });
};

const mapFigmaNodeToReact = (type: BaseNode["type"]) => {
  switch (type) {
    case "TEXT":
      return "string";
    default:
      return "ReactElement | null";
  }
};

const getChildNodeProps = (
  components: ComponentTemplateData[]
): ChildNodePropTemplateData[] => {
  const nodes: Record<string, BaseNode["type"]> = {};
  components.forEach((component) => {
    const { children } = component;
    if (!children.length) {
      return;
    }

    children.forEach((child) => {
      const { name, figmaNodeType } = child;
      nodes[name] = figmaNodeType;
    });
  });

  return Object.entries(nodes).map(([nodeName, nodeType]) => {
    const childNodeProp: ChildNodePropTemplateData = {
      name: nodeName,
      figmaNodeType: nodeType,
      reactTsType: mapFigmaNodeToReact(nodeType),
    };
    return childNodeProp;
  });
};

const getPadding = (node: SceneNode) => {
  if (!hasBaseFrameMixin(node)) {
    return "";
  }

  const {
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
  } = node;
  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
};

const getBaseFrameStyles = (node: SceneNode) => {
  if (!hasBaseFrameMixin(node)) {
    return { padding: "", gap: "" };
  }

  const padding = getPadding(node);

  const { itemSpacing } = node;
  const gap = `${itemSpacing}px`;

  // TODO calculate non flex
  const display = "flex";
  const alignItems = "center";

  return { padding, gap, display, alignItems };
};

const getComponentData = (componentSetNode: ComponentSetNode) => {
  const componentNodes = componentSetNode.children as ComponentNode[];
  const registeredNames = Object.keys(
    componentSetNode.variantGroupProperties
  ).map(camel);

  return componentNodes.map((node) => {
    const { borderColor, borderStyle } = getBorder(node);
    const { padding, gap, display, alignItems } = getBaseFrameStyles(node);

    const style: CSSProperties = {
      borderRadius: getBorderRadius(node),
      backgroundColor: getFillColor(node),
      borderWidth: getBorderWidth(node),
      borderColor,
      borderStyle,
      padding,
      gap,
      display,
      alignItems,
    };

    const map: ComponentTemplateData = {
      serial: serializeProperties(node.variantProperties),
      style: JSON.stringify(style),
      children: getComponentChildren({
        node,
        registeredNames,
      }),
      shouldRenderInFragment: node.children?.length > 1,
    };

    return map;
  });
};

const getVariantProps = (componentSetNode: ComponentSetNode) => {
  const { variantGroupProperties } = componentSetNode;

  return Object.entries(variantGroupProperties).map(
    ([rawPropertyName, { values }]) => {
      const name = camel(rawPropertyName);

      if (valuesAreBooleans(values)) {
        const variantProp: VariantPropTemplateData = {
          name,
          reactTsType: "boolean",
          required: false,
          defaultValue: "false",
        };
        return variantProp;
      }

      if (valuesAreNumbers(values)) {
        const variantProp: VariantPropTemplateData = {
          name,
          reactTsType: "number",
          required: true,
          defaultValue: "",
        };
        return variantProp;
      }

      const hasDefault = valuesHaveDefault(values);

      const variantProp: VariantPropTemplateData = {
        name,
        reactTsType: values.reduce((acc, value) => `${acc} | '${value}'`, ""),
        required: !hasDefault,
        defaultValue: hasDefault ? "'default'" : "",
      };

      return variantProp;
    }
  );
};

interface GenerateCodeOptions {
  node: ComponentSetNode;
  isForwardRef?: boolean;
  elementContext?: "html" | "svg";
  tagName?: HtmlElementTag | SvgElementTag;
}

const generateCode = (options: GenerateCodeOptions) => {
  const {
    node,
    isForwardRef = false,
    elementContext = "html",
    tagName = "div",
  } = options;

  const elementTypeName =
    elementContext === "html"
      ? htmlElementTagNameMap[tagName as HtmlElementTag]
      : svgElementTagNameMap[tagName as SvgElementTag];

  const components = getComponentData(node);
  const variantProps = getVariantProps(node);
  const childNodeProps = getChildNodeProps(components);
  const name = pascal(node.name);
  const templateData: TemplateData = {
    components,
    variantProps,
    childNodeProps,
    name,
    isForwardRef,
    elementTypeName,
    tagName,
  };

  const fileContent = createReactTs(templateData);

  return fileContent;
};

export default generateCode;
