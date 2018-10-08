export interface IResponse {
    success: boolean;
    responseCode: number;
    responseMessage: string;
    Messages: Array<IMessage>;
    TodayMessages: Array<IMessage>;
    Requests: Array<IRequest>;
    TodayRequests: Array<IRequest>;
    Sellers: Array<ISeller>;
    RequestInfo: IRequest;
    Cart: ICart[];
    SellerInfo: ISeller;
    Items: IItem[];
    ItemDetails: IItem;
    SubCategories: ISubCategory[];
    Categories: ICategory[];
    Areas: IArea[];
    AreaInfo: IArea;
    Terms_Conditions: ITerms;
    Advertisments: IAdvertisment[];
    ItemInfo: IAdvertisment;
    AdminInfo: IAdminInfo;
    DeliveryFee: IDeliveryFee;
    AllRequestsCount: string;
    TodayRequestsCount: string;
    AllMessagesCount: number;
    TodayMessagesCount: string;
    TotalItemsCount: number;
    RequestsCount: number;
}
export interface IMessage {
    ID: number;
     Name: String;
     Email: string;
      Phone: string;
       Message: string;
        StatusId: string;
         CreatedAt: Date;
}
export interface IRequest {
    ID: string;
    RequestId: string;
    ClientName: string;
    Phone: string;
    Total: string;
    StatusName: string;
    Address: string;
    Latitude: string;
    Longitude: string;
    Notes: string;
    CreatedAt: Date;
    RequestName: string;
}
export class ISeller {
ID: string;
Name: string;
NameAR: string;
Phone: string;
Address: string;
Latitude: string;
Longitude: string;
}
export interface ICart {
    SellerDetails: ISellerDetails;
    RequestItems: Iitem[];
}
export interface ISellerDetails {
    ID: string;
    Name: string;
    Phone: string;
    Address: string;
    Latitude: string;
    Longitude: string;
}
export interface Iitem {
    ItemId: string;
    ItemName: string;
    ColorName: string;
    ColorImage: string;
    Quantity: string;
    Size: string;
    Price: number;
}
export class IItem {
    ItemInfo: IItemInfo;
    ItemColors: IItemColor[];
    ItemSizes: IItemSize[];
    ItemDescription: IItemDescription[];
    ItemImages: IItemImage[];
}
export interface IItemInfo {
    ID: string;
    Name: string;
    OriginalPrice: string;
    ProfitRatio: string;
    Price: string;
    SellerId: string;
    CategoryId: string;
    SubCategoryId: string;
    HasOptions: string;
    HasDescription: string;
}
export interface IItemColor {
    ID: String;
    NameAr: String;
    NameEn: String;
    ColorImage: String;
    Deleted: string;
}
export interface IItemSize {
    ID: string;
    SizeValue: string;
    Deleted: string;
}
export interface IItemDescription {
    ID: string;
    Name: string;
    Value: string;
    Deleted: string;
}
export interface IItemImage {
    ID: string;
    Image: string;
    Deleted: string;
}

export interface ISubCategory {
    ID: string;
    Image: string;
    Name: string;
    CategoryId: string;
}
export  interface ICategory {
    ID: string;
    Name: string;
    Image: string;
}
export interface IArea {
    ID: string;
    Name: string;
    ArName: string;
}
export interface ITerms {
    Value: string;
}
export interface IAdvertisment {
    ID: string;
    Title: string;
    Description: string;
    Image: string;
}

export interface IAdminInfo {
    Name: string;
}

export class IStatus {
    ID: string;
    StatusName: string;
}

export class IDeliveryFee {
  Value: string;
}

