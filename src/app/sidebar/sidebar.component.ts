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
    icontype: 'image',
    collapse: 'Inbox',
    children: [
        { path: 'Request', title: 'Request', ab: 'RQ' },
        { path: 'ContactUs', title: 'Contact Us', ab: 'CU' }
    ]
},
{
    path: '/Pages',
    title: 'Manage App',
    type: 'sub',
    icontype: 'image',
    collapse: 'manage',
    children: [
        { path: 'Seller', title: 'Seller', ab: 'S' },
        { path: 'Item', title: 'Items', ab: 'I' },
        { path: 'Area', title: 'Area', ab: 'A' },
        { path: 'Terms', title: 'Terms and Conditions', ab: 'TC' },
        { path: 'Advertisment', title: 'Advertisments', ab: 'AD' },
        { path: 'Category', title: 'Category', ab: 'CT' },
        { path: 'SubCategory', title: 'SubCategory', ab: 'SC' },
        { path: 'Delivery', title: 'Delivery Setting', ab: 'DS' },

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
