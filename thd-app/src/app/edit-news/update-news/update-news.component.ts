import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { News } from '../../../app/news.model'
import { EditNewsService } from '../../edit-news.service'
import { ActivatedRoute } from '@angular/router'

/**
 * UpdateNews class which holds the code for update-news components
 */
@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.scss'],
})
export class UpdateNewsComponent implements OnInit {
  /**
   * string variable to hold title for news article from user input
   */
  enteredTitle = ''

  /**
   * string variable to hold content for news article from user input
   */
  enteredContent = ''

  /**
   * string variable which holds the news article Id retrieved from the database
   */
  newsId = ''

  /**
   * Key value pairs used to hold news data (title , content) retrieved from the database
   * as well as the updated values from the user
   */
  newsData = {
    title: '',
    content: '',
  }

  /**
   * Angular form to edit news with two controls (title, content)
   */
  editNewsForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  })

  /**
   * news array of type News which holds the response for news article
   */
  news: News[] = []

  /**
   * a Constructor to create new instance of this class
   *
   * @param editNewsService : Injecting editNewsService which has Http methods for news
   * @param route : used to get the parameter (newsId) for the selected news article
   * @param router : used to navigate to another route
   */
  constructor(
    private editNewsService: EditNewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * This function is called after the constructor is executed.
   * calling a GET request and get back data for a single news article
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.newsId = params['newsId']
    })

    this.editNewsService.getSingleNews(this.newsId).subscribe(
      (res) => {
        this.news = res
        this.editNewsForm.setValue({
          title: this.news['title'], // changing value of the form control 'title' to the title of news article
          content: this.news['content'], // changing value of the form control 'content' to the content of news article
        })
      },
      (err) => {
        if (err.status === 400) {
          //Do something
        }
      }
    )
  }

  /**
   * This function is used to call PUT request in editNewsService with the new data for a single news article.
   */
  updateSignleNews() {
    this.newsData.title = this.enteredTitle
    this.newsData.content = this.enteredContent

    this.editNewsService.updateSignleNews(this.newsId, this.newsData).subscribe(
      (res) => {
        this.router.navigate(['/news'])
      },
      (err) => {}
    )
  }
}