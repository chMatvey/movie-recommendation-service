import { Node } from './node'
import { Link } from './link'

export interface Recommendation {
  id: number // Movie id
  title: string,
  smallImageRef: string
  largeImageRef: string
  nodes: Node[]
  links: Link[]
}
