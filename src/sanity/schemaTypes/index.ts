import { type SchemaTypeDefinition } from 'sanity'
import ads from './ads'
import brand from './brand'
import category from './category'
import hero from './hero'
import heroimages from './heroimages'
import model from './model'
import options from './options'
import subcategory from './subcategory'
import users from './users'
import adview from './adview'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ads,brand,category,hero,heroimages,model,options,subcategory,users],
}
