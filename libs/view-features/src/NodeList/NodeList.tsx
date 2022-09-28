function NodeList(props: {
  nodes: BaseNode[];
  type: 'COMPONENT_SET' | 'COMPONENT';
}) {
  const { nodes, type } = props;

  return (
    <div>
      {nodes.map((node) => {
        console.log(node, type);
        if (node.type !== type) {
          return null;
        }

        return (
          <>
            <div>{node.name}</div>
            {type === 'COMPONENT_SET' && (
              <NodeList
                nodes={node.children as ComponentNode[]}
                type="COMPONENT"
              />
            )}
          </>
        );
      })}
    </div>
  );
}

export default NodeList;
