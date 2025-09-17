import { Component } from "@angular/core";
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-features",
    imports: [Layout, RouterOutlet],
    template: `
        <app-layout>
            <router-outlet></router-outlet>
        </app-layout>
    `
})

export class Features {
}