import type { ICreatorOptions } from "survey-creator-core"
import { useState } from "react"
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react"

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
}

export function SurveyCreatorWidget() {
  let [creator, setCreator] = useState<SurveyCreator>()

  if (!creator) {
    creator = new SurveyCreator(defaultCreatorOptions)
    setCreator(creator)

    creator.saveSurveyFunc = (
      saveNo: number,
      callback: (num: number, status: boolean) => void,
    ) => {
      window.localStorage.setItem("survey-json", creator?.text || "")
      callback(saveNo, true)
      console.log(JSON.parse(creator?.text || ""))
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}
