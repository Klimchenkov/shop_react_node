import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._types = []
        
        this._brands = []

        this._devices = []

        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        
        this._basket = {}
        this._countBasket = 0
        this._totalSum = 0
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
        this.setPage(1)
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(limit){
        this._limit = limit
    }
    setBasket(basket){
        this._basket = basket
    }
    setCountBasket(count){
        this._countBasket = count
    }
    setTotalSum(sum){
        this._totalSum = sum
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
    get basket() {
        return this._basket
    }
    get countBasket() {
        return this._countBasket
    }
    get totalSum() {
        return this._totalSum
    }
}