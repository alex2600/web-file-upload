import _ from 'lodash'

/////////////////////////////////////////////////////////////////////////

export default {
    getSizeText,
    getFileType,
    isMediaItem,
}

/////////////////////////////////////////////////////////////////////////

// get file type from mime type
function getFileType(file) {
    if (!file.mime) return null
    return file.mime.split("/")[0]
}

function isMediaItem(file) {
    let type = getFileType(file).toLowerCase()
    return type === "image" || type === "video"
}

function getSizeText(bytes) {
    if (!bytes) return bytes
    var units = [
        {name: "kb", factor: 1024},
        {name: "mb", factor: 1024 * 1024},
        {name: "gb", factor: 1024 * 1024 * 1024}
    ]
    var u = bytes < units[2].factor ? units[1] : units[2]
    var b = bytes / u.factor
    b = (Math.round(b * 10)) / 10
    return b + u.name
}


