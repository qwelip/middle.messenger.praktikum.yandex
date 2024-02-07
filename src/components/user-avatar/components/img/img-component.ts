import Block from '../../../../core/block'

interface IAvatar {
  imgSrc: string
  isNoAvatar: boolean
  isSmall?: boolean
}

export default class ImgComponent extends Block {
  constructor(props: IAvatar) {
    super('img', {
      ...props,
    })
  }

  render() {
    return `
      {{#if isNoAvatar}}
        {{#if isSmall}}
          <img
            class='user-avatar__img user-avatar__img_no-avatar user-avatar__img_small'
            src={{imgSrc}}
            alt='Иконка аватара'
          />
        {{else}}
          <img
            class='user-avatar__img user-avatar__img_no-avatar'
            src={{imgSrc}}
            alt='Иконка аватара'
          />
        {{/if}}
      {{else}}
        <img
          class='user-avatar__img'
          src={{imgSrc}}
          alt='Иконка аватара'
        />
      {{/if}}
    `
  }
}
