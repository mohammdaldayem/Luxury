import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserService } from '../Services/User.service'
declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
},
{
    path: '/Pages',
    title: 'Inbox',
    type: 'sub',
    icontype: 'move_to_inbox',
    collapse: 'Inbox',
    children: [
        { path: 'Request', title: 'Request', ab: '' },
        { path: 'ContactUs', title: 'Contact Us', ab: '' }
    ]
},
{
    path: '/Pages',
    title: 'Manage App',
    type: 'sub',
    icontype: 'settings',
    collapse: 'manage',
    children: [
        { path: 'Seller', title: 'Seller', ab: '' },
        { path: 'Item', title: 'Items', ab: '' },
        { path: 'Area', title: 'Area', ab: '' },
        { path: 'Terms', title: 'Terms and Conditions', ab: '' },
        { path: 'Advertisment', title: 'Advertisments', ab: '' },
        { path: 'Category', title: 'Category', ab: '' },
        { path: 'SubCategory', title: 'SubCategory', ab: '' },
        { path: 'Delivery', title: 'Delivery Setting', ab: '' },

    ]
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor(private userService: UserService) {

    }

    public menuItems: any[];
    userName: string = 'jebrilmohamamd';
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userName = this.userService.getUserName();
    }
    logOut() {
        this.userService.logOut();
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
