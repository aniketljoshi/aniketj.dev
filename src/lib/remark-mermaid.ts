import type { Root, Code } from "mdast";

/**
 * Remark plugin that transforms ```mermaid code blocks into
 * <Mermaid chart="..."> JSX elements so they can be rendered
 * by the MermaidDiagram component at runtime.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.type === "code" && node.lang === "mermaid") {
        const code = node as Code;
        children[i] = {
          type: "mdxJsxFlowElement" as any,
          name: "Mermaid",
          attributes: [
            {
              type: "mdxJsxAttribute" as any,
              name: "chart",
              value: code.value,
            },
          ],
          children: [],
          data: { _mdxExplicitJsx: true },
        } as any;
      }
    }
  };
}
