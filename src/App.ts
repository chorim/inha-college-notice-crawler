//
//  index.ts
//  inha-college-notice-crawler
//
//  Created by Yukihira Nanako on 16/07/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import {extractor, fetch} from "./fetch"
import {Board} from "./Board"

(async() => {
  const departmentContent: string = await fetch(`https://cms.itc.ac.kr/${Board.department}&page=1`)
  const department = extractor(departmentContent)
  console.log(department)

  const schoolContent = await fetch(`https://cms.itc.ac.kr/${Board.school}&page=1`)
  const school = extractor(schoolContent)
  console.log(school)
})()



