import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Edit news serivce class which has few functions that sends HTTP requests to the back-end server
 */
@Injectable({
  providedIn: 'root',
})
export class EditNewsService {
  /**
   * url for the end point API for news
   */
  private newsUrl = 'http://localhost:5000/api/news';

  /**
   * a constructor to create new instance of this class
   * @param http : used to perform HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * This function sends GET request to the REST API endpoint in the backend server
   * it return JSON object of all news
   */
  getAllNews() {
    return this.http.get<any>(this.newsUrl);
  }

  /**
   * This function sends POST request to the REST API endpoint in the backend server to add news article
   * @param news : json object of the new article to be added in the database
   */
  addNews(news) {
    return this.http.post<any>(this.newsUrl, news);
  }

  /**
   * This function send DELETE request to the REST API endpoint in the backend server to delete a single news article
   * @param newsId : Id of news article
   */
  deleteSingleNews(newsId: string) {
    return this.http.delete('http://localhost:5000/api/news/' + newsId);
  }

  /**
   * This function sends GET request to the backend server endpoint API to get a single news article
   * @param newsId Id of news article
   */
  getSingleNews(newsId: string) {
    // console.log(newsId)
    return this.http.get<any>('http://localhost:5000/api/news/' + newsId);
  }

  /**
   * This function send UPDATE(PUT) request to the backend server endpoint API to update a single news article
   * @param newsId holds the Id of news article
   * @param news json object that holds the data to update a single news article
   */
  updateSignleNews(newsId, news) {
    return this.http.put<any>('http://localhost:5000/api/news/' + newsId, news);
  }
}
