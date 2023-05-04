import _ from "lodash"

const baseUrl = 'http://localhost:3002'

export async function getFiles () {
   const res = await fetch(`${baseUrl}/api/file/list`)
   if (res.status === 401) {
      throw {status: 401, message: "auth required"}
   }
   return res.json()
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

export async function deleteFiles (idList) {
   console.log("deleteFiles", idList)
   try {
      if (_.isArray(idList) && idList.length > 0) {
         return await Promise.all(idList.map(deleteFile))
      }
      else {
         throw new Error("idList not a valid argument: " + idList)
      }
   } catch (ex) {
      console.error(ex)
      throw ex
   }
}

export async function deleteFile (fileId) {
   try {
      const res = await fetch(`${baseUrl}/api/file/${fileId}`, {
         method: "DELETE",
      })
      return await res.json()
   } catch (ex) {
      console.error(ex)
      throw ex
   }
}
