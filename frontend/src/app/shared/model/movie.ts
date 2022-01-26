import { Genre } from './genre'
import { Country } from './country'

export interface Movie {
  id: number
  title: string
  smallImageRef: string
  largeImageRef: string
  rating: number
  voiceCount: number
  genre: Genre[]
  country: Country
  duration: number
  minAge: number
}
