import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Inject } from '@angular/core';

/**
 * artile dialog class
 */
@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {

  /**
   * Injecting data so that it makes it possible to use data passed form news class
   * @param data : json data 
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * This method is called after the constructor is executed.
   * It does nothing at the moment
   */
  ngOnInit(): void {
  }

}
