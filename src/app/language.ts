
import P from 'parsimmon'

import {
  Language,
  LanguageParts
} from '../commons/types.js'

export const language:Language = { }

language._ = () => {
  return P.regexp(/\s*/)
},
language.__ = () => {
  return P.regexp(/\s+/)
},

language.Arg = ref => {
  return P.alt(ref.String, ref.Number)
}

language.Call = ref => {
  const withArgs = P.seqMap(
    ref.ProcName,
    ref.__,
    P.sepBy(ref.Arg, P.whitespace),
    (proc, _, args) => {
      return { type: LanguageParts.Call, proc, args }
    }
  )

  const withoutArgs = ref.ProcName.map(proc => {
    return { type: LanguageParts.Call, proc, args: [] }
  })

  return P.alt(withArgs, withoutArgs)
}

language.ProcName = () => {
  return P.regexp(/[a-zA-Z0-9]+\??/)
}

language.Number = () => {
  return P.regexp(/[0-9]+/).map(Number)
}

language.String = () => {
  return P.regexp(/\"[^\"]*\"/).map((part:string) => {
    return part.slice(1, -1)
  })
}

language.Jump = ref => {
  return P.regexp(/\:[0-9]+/).map(match => {
    return {
      proc: 'jump',
      type: LanguageParts.Call, // -- todo enum
      args: [Number(match.slice(1))]
    }
  })
}

language.Value = ref => {
  return P.seqMap(
    ref._,
    P.alt(ref.Call, ref.Jump),
    ref._,
    (_0, core, _1) => core)
}
