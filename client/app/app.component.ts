import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
  template: `
    <my-navbar></my-navbar>
    <div class="container">
      <my-todos></my-todos>
    </div>

`,
})
export class AppComponent  {

}
