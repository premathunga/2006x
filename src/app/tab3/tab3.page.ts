import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface cont {
  id: string;
  date: string;
  location: string;
  call: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page implements OnInit {

  police: cont[] = [];

  searchName;
  policeUnfiltered: cont[];

  constructor(private http: HttpClient, private router: Router) { }

ionViewWillEnter(){
  console.log("View triggers");
  this.loadInfos();
  this.loadDatas();
  
}

  ngOnInit() {

    // let url = "assets/data/data.json"

  }

  loadDatas(){
    this.police = JSON.parse(localStorage.getItem("police"));
    this.policeUnfiltered = this.police;
  }

  loadInfos(){
    let url = "https://classmate.teamxdevelopers.com/info/"

    this.http.get<cont[]>(url)
      .subscribe(data => {
        if(data.length >0){
         localStorage.setItem("police", JSON.stringify(data));
        this.loadDatas();
        console.log(this.police);
        }
      })
  }

  search() {
    this.resetChanges();
    if (!(this.searchName === '')) {
      const searchResult = this.police.filter((currentList) => {
        if (currentList.date && this.searchName) {
          return (
            currentList.date
              .toLowerCase()
              .indexOf(this.searchName.toLowerCase()) > -1
          );
        }
      });
      this.police = searchResult;
    }
  }

  resetChanges() {
    this.police = this.policeUnfiltered;
  }


}
