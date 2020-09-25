
export function isString (pattern: any): pattern is string {
  return typeof pattern === 'string'
}

export function isRegexp (pattern: any): pattern is RegExp {
  return pattern instanceof RegExp
}
