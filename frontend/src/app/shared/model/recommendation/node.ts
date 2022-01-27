import { NodeType } from './node-type'

export interface Node {
  id: number
  type: NodeType
  title: string
}
