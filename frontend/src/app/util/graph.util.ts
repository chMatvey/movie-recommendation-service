import * as d3 from '../d3/model';
import * as model from '../shared/model/recommendation';

export function recommendationToD3model(recommendationModel: model.Recommendation): {nodes: d3.Node[], links: d3.Link[]} {
  const nodes: d3.Node[] = []
  const links: d3.Link[] = []

  const getNodeById = (id: number) => nodes.find(node => node.id === id)

  for (const nodeModel of recommendationModel.nodes) {
    const radius = nodeRadiusByType(nodeModel.type)
    const color = nodeColorByType(nodeModel.type)

    nodes.push(new d3.Node(nodeModel.id, nodeModel.title, radius, color))
  }

  for (const linkModel of recommendationModel.links) {
    const d3sourceNode = getNodeById(linkModel.sourceId)!
    const d3targetNode = getNodeById(linkModel.targetId)!

    if (d3sourceNode && d3targetNode) {
      d3sourceNode.linkCount++
      d3targetNode.linkCount++

      links.push(new d3.Link(d3sourceNode, d3targetNode, linkModel.title))
    }
  }

  return {nodes, links}
}

function nodeRadiusByType(type: model.NodeType): number {
  return type === model.NodeType.RECOMMENDATION ? 70 : 55
}

function nodeColorByType(type: model.NodeType): string {
  switch (type) {
    case model.NodeType.RECOMMENDATION: return '#f8881d'
    case model.NodeType.WATCHED: return '#7295c9'
    case model.NodeType.LINK: return '#d9c8ae'
    default: throw new Error("Unsupported node type")
  }
}
