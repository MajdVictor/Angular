import { Component, OnInit } from '@angular/core'
import { News } from '../news.model'
import { EditNewsService } from '../edit-news.service'
import { MatDialog } from '@angular/material/dialog';
import { ArticleDialogComponent } from './article-dialog/article-dialog.component';

/**
 * News class which holds the code for news component
 */
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  /**
   * a list of type News which holds all news available in the database
   */
  newsList: News[] = []

  /**
   * string variable to hold the user input for filtering the news list
   */
  newsTitleSearch: string

  /**
   * a constructor to create new instance of this class
   * @param editNewsService : Injecting editNewsService which is used to call a GET request to get all news
   * @param dialog : used to open up a dialog to display the content of a single article
   */

   
  constructor(private editNewsService: EditNewsService, public dialog: MatDialog) {}

  /**
   * This method is called after the constructor is executed.
   * It calls getAllNews method in editNewsService to retrieve all news from the database and assign them to newslist
   */
  ngOnInit() {
    this.editNewsService.getAllNews().subscribe(
      (res) => (this.newsList = res),

      (err) => {
        //do something
      }
    )
  }

  /**
   * This function is used to filter news in newsList based on the user Input.
   * It returns all news match their titles match with the user input
   */
  searchArticle() {
    if (this.newsTitleSearch != '') {
      this.newsList = this.newsList.filter((result) => {
        //changing user input to lower case as well as the news in newsList
        return result.title
          .toLocaleLowerCase()
          .match(this.newsTitleSearch.toLocaleLowerCase())
      })
    } else if (this.newsTitleSearch == '') {
      this.ngOnInit() // call ngOnInit if the search box is empty to list all news again
    }
  }

  /**
   * This function is called when read more button is clicked on a single news article
   * @param content : string variable which holds the content of the article selected
   * @param title : string variable which holds the title of the article selected
   */
  readArticle(content: string , title:string){

    //passing the title and the content of the selected article to the dialog 
    this.dialog.open(ArticleDialogComponent,{data:{ "articleContent" : content, "articleTitle" : title}});
  }
}
