import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Article {
  title: string;
  img: string;
  description: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]>;
  showForm: Boolean = false;
  newArticle: Article = {
    title: "",
    img: "",
    description: ""
  }

  constructor(private db: AngularFirestore) {
    // valueChanges() for just doc data
    // this.articles$ = db.collection<Article>('articles').valueChanges();

    // .snapshotChanges() for all meta data (including document id)
    this.articles$ = this.db.collection<Article>('articles')
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Article;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {
    this.articles$.subscribe(data => console.log(data));
  }

  onSubmit() {
    console.log(this.newArticle);
    this.db.collection<Article>('articles').add(this.newArticle);
    this.showForm = false;
  }
}
