/* eslint-disable import/prefer-default-export */
import Mustache from 'mustache';
import rp from 'request-promise';
import mainTemplate from './atoms/default/server/templates/main.html!text';

export function render() {
  return rp({
    uri: 'https://interactive.guim.co.uk/docsdata-test/11B90r_OGevVT1L6t02pN9GuASfhVGiYCs_gg_-j-mgI.json',
    json: true,
  }).then((data) => {
    const { sheets } = data;
    // const toRender = sheets;
    let counter = 0;
    const toRender = {
      ...sheets,
      // eslint-disable-next-line no-return-assign
      count: () => () => counter += 1,
      createCaption: () => (text, rendering) => {
        if (rendering(text)) return `<span class="swiper-slide__caption">${rendering(text)}</span>`;
        return '';
      },
    };
    const html = Mustache.render(mainTemplate, toRender);
    return html;
  });
}
