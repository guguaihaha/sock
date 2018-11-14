import $ from './_isObject'

var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g

var _trim = function (obj) {

    return obj == null ? "" : (obj + "").replace(RE_TRIM,"")

}

export default _trim