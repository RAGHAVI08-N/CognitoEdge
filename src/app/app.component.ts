import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './Modules/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizweb';
}
