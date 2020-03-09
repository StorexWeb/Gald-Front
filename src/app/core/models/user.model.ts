import {Fuseconfig} from './fuse.model';

export class Seat{
    public province?: String;
    public common?: String;
    public address?: String;
    public cap?: String;
    constructor( obj?: SeatInterface ) {
        this.province = obj && obj.province || null;
        this.cap = obj && obj.cap || null;
        this.address = obj && obj.address || null;
        this.common = obj && obj.common || null;
    }
}
export interface SeatInterface {
    _id?: string;
    province?: string;
    common?: string;
    address?: string;
    cap?: string;
}
export class User {
    public _id?: string;
    public sha512?: String;
    public img?: [ string];
    public name?: string;
    public surname?: string;
    public username?: string;
    public password?: string;
    public email?: string;
    public state?: string;
    public role?: string;
    public profile_img?: string;
    public room?: number;
    public phone?: string;
    public mobile?: string;
    public title?: string;
    public company?: string;
    public address?: string;
    public cap?: string;
    public province?: string;
    public common?: string;
    public cf?: string;
    public piva?: string;
    public date?: Date;
    public seat?: Seat;
    public seat_point?: Seat;
    public token?: string;
    public fuseconfig?: Fuseconfig;
    public regionesociale?: string;
    public client_type ?: string;
    public inizioattivita?: Boolean;
    public consultant?: any;
    public area_manager?: User;
    public point_name?: string;

    constructor( obj?: UserInterface ) {
        this._id = obj && obj._id || null;
        this.name = obj && obj.name || null;
        this.surname = obj && obj.surname || null;
        this.username = obj && obj.username || null;
        this.password = obj && obj.password || null;
        this.email = obj && obj.email || null;
        this.state = obj && obj.state || null;
        this.role = obj && obj.role || null;
        this.phone = obj && obj.phone || null;
        this.mobile = obj && obj.mobile || null;
        this.title = obj && obj.title || null;
        this.company = obj && obj.company || null;
        this.address = obj && obj.address || null;
        this.cap = obj && obj.cap || null;
        this.province = obj && obj.province || null;
        this.common = obj && obj.common || null;
        this.cf = obj && obj.cf || null;
        this.piva = obj && obj.piva || null;
        this.date = obj && obj.create_date || null;
        this.seat = obj && obj.seat || null;
        this.seat_point = obj && obj.seat_point || null;
        this.token = obj && obj.token || null;
        this.fuseconfig = obj && obj.fuseconfig || null;
        this.regionesociale = obj && obj.regionesociale || null;
        this.client_type = obj && obj.client_type || null;
        this.inizioattivita = obj && obj.inizioattivita ||  null;
        this.point_name = obj && obj.point_name ||  null;
        this.area_manager = obj && obj.area_manager ||  null;
        this.consultant = obj && obj.consultant || null;
    }
}

export interface UserInterface {
    _id?: string;
    sha512?: String;
    img?: [ string];
    name?: string;
    surname?: string;
    username?: string;
    password?: string;
    email?: string;
    state?: string;
    role?: string;
    profile_img?: string;
    room?: number;
    phone?: string;
    mobile?: string;
    title?: string;
    company?: string;
    address?: string;
    cap?: string;
    province?: string;
    common?: string;
    cf?: string;
    piva?: string;
    create_date?: Date;
    seat?: Seat;
    seat_point?: Seat;
    token?: string;
    fuseconfig?: Fuseconfig;
    regionesociale?: string;
    client_type ?: string;
    inizioattivita?: Boolean;
    consultant?: any;
    area_manager?: User;
    point_name?: string;
}
