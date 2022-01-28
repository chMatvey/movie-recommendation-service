import { NodeType } from './node-type'

export interface Node {
  id: number // Database item id or custom id
  type: NodeType
  title: string
}
