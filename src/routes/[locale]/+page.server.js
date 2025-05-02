/** @type {import('./$types').PageServerLoad} */
import { marked } from 'marked';

export async function load({ params}) {
    const payload = {
        operationName: "SiteQuery",
        query: `
          query SiteQuery {
            siteCopy {
              key
              en
              es
              markdown
            }
          }
        `
    }
    return graphql("https://api.baseql.com/airtable/graphql/appGrAP5nR5zWF1EN", payload).then(data => {
        // Map translations into a usable format
        const copyStrings = data.siteCopy.reduce((acc, copy) => {
          acc[copy.key] = { en: copy.markdown ? marked.parse(copy['en']) : copy['en'], es: copy.markdown ? marked.parse(copy['es']) : copy['es'] };
          return acc;
        }, {});
        
        return { copyStrings };
    });
}

/**
* Simple graphql client. 
* @param {string} url The graphql endpoint url
* @param {object} payload The graphql payload
* @param {object} headers HTTP headers stored as an object
*/
async function graphql(url, payload, headers = {}) {
  headers["content-type"] = "application/json";
  headers["accept"] = "application/json";
  return fetch(url, {
    body: JSON.stringify(payload),
    headers: headers,
    method: "POST",
    mode: "cors"
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      return jsonData.data;
    });
}