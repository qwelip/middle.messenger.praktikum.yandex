import Handlebars, { HelperOptions } from 'handlebars'
import Block from './block'

export function registerComponent(name: string, Component: typeof Block, tag: string) {
  if (name in Handlebars.helpers) {
    // eslint-disable-next-line no-throw-literal
    throw `The ${name} component is already registered!`
  }

  // eslint-disable-next-line func-names
  Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(tag, hash)

    const dataAttribute = `data-id="${component.id}"`

    if ('ref' in hash) {
      // eslint-disable-next-line no-extra-semi
      ;(data.root.__refs = data.root.__refs || {})[hash.ref] = component
    }

    // eslint-disable-next-line no-extra-semi
    ;(data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`)
        if (!stub) {
          return
        }

        component.getContent()?.append(...Array.from(stub.childNodes))
        stub.replaceWith(component.getContent()!)
      },
    })

    const contents = fn ? fn(this) : ''

    return `<div ${dataAttribute}>${contents}</div>`
  })
}
