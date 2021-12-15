import mainTemplate from "./atoms/default/server/templates/main.html!text"
import Mustache from 'mustache'
import rp from 'request-promise'

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/11B90r_OGevVT1L6t02pN9GuASfhVGiYCs_gg_-j-mgI.json',
        json: true
    }).then((data) => {
        var sheets = data.sheets;
        console.log(sheets);
        var html = Mustache.render(mainTemplate, sheets);
        return html;
    });
}