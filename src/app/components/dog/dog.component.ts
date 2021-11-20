import { APP_BASE_HREF } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app-dog",
  templateUrl: "./dog.component.html",
  styleUrls: ["./dog.component.scss"],
})
export class DogComponent implements OnInit {
  constructor() {}
  arr = new Array(50).fill(0);
  ngOnInit(): void {}
}
