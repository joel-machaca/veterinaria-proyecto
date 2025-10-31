import { Component } from '@angular/core';
import { StartIcon } from "../../shared/icons/start-icon/star-icon";
import { Hearth } from "../../shared/icons/hearth/hearth";

@Component({
  selector: 'app-home',
  imports: [StartIcon, Hearth],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
