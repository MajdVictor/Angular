/**
 * Language interface which defines the structure of Language objects
 */
export interface Language {
  /**
   *string variable that holds the value of the language ex: en or de
   */
  value: string;

  /**
   * string variable that holds the value of the text which will be displayed in the user interface eg: EN or DE
   */
  viewValue: string;
}
