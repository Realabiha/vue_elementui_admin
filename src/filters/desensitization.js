import {typeOf} from '@utils/tools'
export default function(data){
  const isString = typeOf(data) == 'String'
  if(!isString) return data
  const replace = data.slice(1, -1)
  return data.replace(replace, '****')
}