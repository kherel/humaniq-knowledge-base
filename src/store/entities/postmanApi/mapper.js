const _getResponse = (rawResponse) => {
  let response
  rawResponse.forEach(({code, body}) => {
    if (code === 200) {
      console.log('body', body)
      response = body
    }
  })
  return response
}

export default (articles) => {
  console.log('articles',articles)
  return Object.values(articles).map(({info:article, item:sections}, articleNum) => {
    sections = sections[0].item || sections
    const articleId = `article-${articleNum + 1}`
    console.log('article.name', article.name)
    return {
      id: articleId,
      title: article.name,
      description: article.description,

      sections: sections.map(({name: sectionTitle, request, response}, sectionNum) => {
        console.log('response', response)
        const sectionId = `${articleId}-section-${sectionNum + 1}`
        return {
          id: sectionId,
          title: sectionTitle,
          request: {
            body: request.body.raw,
            header: request.header,
            description: request.description,
            method: request.method,
            url: request.url,
          },
          response : _getResponse(response)
        }
      })
    }
  })
}
