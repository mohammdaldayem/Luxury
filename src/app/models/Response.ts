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
    SubCategories : ISubCategory[];
    Categories : ICategory[];
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
}
export interface ISeller {
ID: string;
Name: string;
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
}
export interface IItem {
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
    HasOptions: string;
    HasDescription: string;
}
export interface IItemColor {
    ID: String;
    NameAr: String;
    NameEn: String;
    ColorImage: String;
}
export interface IItemSize {
    ID: string;
    SizeValue: string;
}
export interface IItemDescription {
    ID: string;
    Name: string;
    Value: string;
}
export interface IItemImage {
    ID: string;
    Image: string;
}
export interface ISubCategory {
    ID: string;
    Image: string;
    Name : string;
    CategoryId : string; 
}
export  interface ICategory {
    ID : string;
    Name :string;
    Image : string;
}
