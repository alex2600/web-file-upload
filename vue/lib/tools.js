import _ from 'lodash'

/////////////////////////////////////////////////////////////////////////

export default {
    getSizeText,
    uploadFile,
    deleteFiles,
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

function uploadFile(file, persist = false) {
    const upfile = new FormData()
    upfile.append("file", file)

    let url = "/api/upload";
    if(persist) url = `${url}?persist=1`
    return fetch(url, {
        method: "POST",
        body: upfile,
    }).then(res => res.json())
}

function deleteFiles(idList) {
    console.log("deleteFiles", idList)
    if (_.isArray(idList) && idList.length > 0) {
        return Promise
            .all(idList.map(function (_id) {
                return fetch(`/api/file/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .catch(function (err) {
                        console.error(err)
                    })
            }))
    } else {
        return Promise.reject("idList not a valid argument: " + idList)
    }
}
