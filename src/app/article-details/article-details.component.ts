import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, filter, map, merge } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router'; // listen to changes in the router
import { Observable } from 'rxjs';

export interface Article {
  title: string;
  img: string;
  description: string;
}

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  article$: Observable<Article>;
  showEditForm: Boolean = false;
  name: String;
  newArticle: Article = {
    title: "",
    img: "",
    description: ""
  };
  fieldsUpdated: Array<string> = [];

  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.name = params.name)
  }

  ngOnInit() {
    this.article$ = this.db.doc<Article>('articles/' + this.name).valueChanges();
    // this.article$.subscribe(data => console.log('data', data));
    this.article$.subscribe(data => {
      // compare data to newArticle and update only data
      if(!this.showEditForm) {
        this.newArticle = data;
      } else {
        console.log('form is showing while an update came in..');
        let mergedArticle: Article = this.mergeArticle(data, this.newArticle);
        this.newArticle = mergedArticle;
      }
    });
  }

  // Give me a merged article
  mergeArticle(dataFromStream: Article, localData: Article) {
    let mergedArticle: Article = {
      title: "",
      img: "",
      description: ""
    };
    Object.keys(dataFromStream).forEach((key) => {
      // auto merge new dataFromStream not in existing dataFromStream
      if(!localData[key]) {
        // can't find add to mergedArticle
        mergedArticle[key] = dataFromStream[key];
      } else {
        // could find the new dataFromStream key in our existing article
        // compare values
        if(localData[key] === dataFromStream[key]) {
          // values match add to mergedArticle
          mergedArticle[key] = dataFromStream[key];
        } else {
          // values don't match, take local > new
          console.log('Key: ');
          console.log('streamData: ', dataFromStream[key]);
          console.log('localData: ', localData[key]);
          if(this.fieldsUpdated.includes(key)) {
            mergedArticle[key] = localData[key];
          } else {
            mergedArticle[key] = dataFromStream[key];
          }
        }
      }
    })
    console.log('mergedArticle', mergedArticle);
    return mergedArticle;
  }

  // Push changed keys into array
  onChange(key) {
    console.log(key);
    this.fieldsUpdated.push(key);
  }

  onEditFormSubmit() {
    console.log(this.newArticle);
    this.db.doc('articles/' + this.name).update(this.newArticle);
    this.showEditForm = false;
  }

  confirmDelete() {
    const answer = prompt('Are you sure you want to delete this article? (yes or no)');
    if(answer === "yes") {
      this.db.doc('articles/' + this.name).delete();
      this.router.navigate(['articles']);
    }
  }

}
