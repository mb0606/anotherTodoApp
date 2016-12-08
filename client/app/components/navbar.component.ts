import { Component } from '@angular/core';


@Component({
  selector: 'my-navbar',
  template: `
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"><img src="./app/assests/Logomakr_79PFgK.png" alt="another todo"></a>
        </div>
        <ul class="nav navbar-nav">
          <li  style="cursor: pointer"><a>Home</a></li>
          <li  style="cursor: pointer"><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </nav>
   `
})

export class NavbarComponent {



}
