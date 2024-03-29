import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid } from "@nativescript/core";
import { Page } from "@nativescript/core";
import { UIService } from "../../services/ui.service";
declare var android: any;

@Component({
  selector: "action-bar",
  templateUrl: "action-bar.component.html",
  styleUrls: ["action-bar.component.css"],
  moduleId: module.id,
})
export class ActionBarComponent implements OnInit {
  @Input() title: string;
  @Input() showBackButton = true;
  @Input() hasMenu = true;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  ngOnInit() {}
  get android() {
    return isAndroid;
  }
  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }
  onGoBack() {
    this.router.backToPreviousPage();
  }
  onLoadActionBar() {
    if (isAndroid) {
      const androidToolBar = this.page.actionBar.nativeView;
      const backButton = androidToolBar.getNavigationIcon();
      let color = "#171717";
      if (this.hasMenu) {
        color = "#ffffff";
      }
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor(color),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }
  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
