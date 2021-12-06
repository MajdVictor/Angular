import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { EditNewsService } from '../edit-news.service'
import { Router } from '@angular/router'
import { News } from '../../app/news.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'

/**
 * EditNews class which holds the code for edit-news components
 */
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
})
export class EditNewsComponent implements OnInit {
  /**
   * string variable to hold title for news article from user input
   */
  enteredTitle = ''

  /**
   * string variable to hold content for news article from user input
   */
  enteredContent = ''

  /**
   * Angular form to edit news with two controls (title, content)
   */
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  })

  /**
   * Key value pairs used to hold news data (title , content) retrieved from the database
   * as well as the updated values from the user
   */
  newsData = {
    title: '',
    content: '',
  }

  /**
   * news list to hold all news articles retrieved from the database
   */
  news: News[] = []

  /**
   * a Constructor to create new instance of this class
   *
   * @param editNewsService : Injecting editNewsService which has Http methods for news
   * @param router : used to navigate to another route
   */
  constructor(
    private editNewsService: EditNewsService,
    private router: Router
  ) {}

  /**
   * This function is used to call a GET request in editNewsService and get back all news available
   */
  getAllNews() {
    this.editNewsService.getAllNews().subscribe(
      (res) => (this.news = res), //assigning the response to news list

      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

  /**
   * This function is called after the constructor is executed.
   * calling getAllNews to update the list of news immediately for the user who want to edit news
   */
  ngOnInit() {
    this.getAllNews()
    this.form.reset() // resetting the form fields
  }

  /**
   * This function is used to call a post request in the editnewsService and passing
   * the new data for a signle news article
   */
  addNews() {
    this.newsData.title = this.enteredTitle
    this.newsData.content = this.enteredContent

    this.editNewsService.addNews(this.newsData).subscribe(
      (res) => {},
      (err) => {
        if (err.status === 400) {
          console.log(err)
        }
      }
    )
    this.getAllNews() //updating the list of news immediately after the post request
    this.form.reset() // resetting the form fields
    
  }

  /**
   * This functions is used to delete a single news article
   *
   * @param newsId : Id of the single news article the user wants to delete
   */
  deleteSingleNews(newsId: string) {
    if (confirm('Are you sure you want to delete this News?')) {
      //displaying a pop up message
      this.editNewsService.deleteSingleNews(newsId).subscribe(
        (res) => {
          this.editNewsService.getAllNews()
        },
        (err) => {}
      )
    }
    this.getAllNews()
  }
}