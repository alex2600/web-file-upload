const baseUrl = 'http://localhost:3002'

export function getFiles () {
   return fetch(`${baseUrl}/api/file/list`).then(res => res.json())
}

export function uploadFile (file, persist = false) {
   const upfile = new FormData()
   upfile.append("file", file)

   let url = `${baseUrl}/api/upload`
   if (persist) url = `${url}?persist=1`
   return fetch(url, {
      method: "POST",
      body: upfile,
   }).then(res => res.json())
}

export function getCount () {
   return fetch(`${baseUrl}/api/file/count`).then(res => res.json())
}

export function getFileSize () {
   return fetch(`${baseUrl}/api/file/size`).then(res => res.json())
}

