const shortid = require("shortid")

class PageId {
    constructor() {
        this._previous = shortid()
        this._current = shortid()
        this._next = shortid()
    }
    increment() {
        this._previous = this._current
        this._current = this._next
        this._next = shortid()    
    }
    get previous() {
        return this._previous
    }
    get current() {
        return this._current
    }
    get next() {
        return this._next
    }
}

module.exports = PageId