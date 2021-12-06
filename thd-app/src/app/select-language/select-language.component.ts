import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Language } from '../language'

/**
 * Langugae class which holds the code for SelectLangugae component
 */
@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {
  
  /**
   * list of type Language which holds key value pairs
   * value: used for translation
   * viewValue: used to be displayed in the UI
   */
  languages: Language[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'de', viewValue: 'DE' }
  ]

  /**
   * a constructor to create new instance of this class
   * @param translate : used for translating texts based on the langugae selected by the user
   */
  constructor(public translate: TranslateService) { }

  /**
   * This method is called after the constructor is executed.
   */
  ngOnInit() {
  }

  /**
   * This function will call the use method in translate service and passing the user selected language value
   * @param languageValue: string value passed by the user, en or de
   */
  changeLanguage(languageValue: string){
    this.translate.use(languageValue)
  }
}
