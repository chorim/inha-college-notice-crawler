//
//  fetch.ts
//  inha-college-notice-crawler
//
//  Created by Yukihira Nanako on 16/07/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import request from "request"
import cheerio from "cheerio"

interface Article {
  index: number,
  types: string,
  subject: string,
  author: string,
  views: number,
  created: string
}

interface Articles extends Array<Article> {}

export const fetch = (uri: string) => new Promise<any>((resolve, reject) => {
  request.get(uri, (error: any, { statusCode }, body: any) => {
    (error || statusCode !== 200) ? reject(error) : resolve(body)
  })
})

export const extractor = (content: string) => {
  const $ = cheerio.load(content)
  const rawArticles = $(".tb tr")

  const articles: Articles = []

  rawArticles.each((index: number, element: CheerioElement) => {
    const td = $(element).find("td")
    // 9999 is notice article
    const idx = !td.eq(0).text() ? index : 9999
    const article: Article = {
      index: idx,
      types: td.eq(1).text(),
      subject: $(element).find(".subject a").text(),
      author: td.eq(3).text(),
      views: +td.eq(4).text(),
      created: $(element).find(".gray").text()
    }
    articles.push(article)
  })
  return articles
}

