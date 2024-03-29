import _ from "lodash"

const baseUrl = import.meta.env.VITE_API_BASE

/////// FILES ////////////////////////////////////////////////////////////////

export async function getFiles (type = "data") {
   const res = await fetch(`${baseUrl}/api/file/list?type=${type}`, {
      headers: getAuthHeader(),
   })
   if (res.status === 401) {
      throw {status: 401, message: "auth required"}
   }
   return res.json()
}

export async function getFile (id) {
   const res = await fetch(`${baseUrl}/api/file/${id}?type=data`, {
      headers: getAuthHeader(),
   })
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
         headers: getAuthHeader(),
      })
      return await res.json()
   } catch (ex) {
      console.error(ex)
      throw ex
   }
}

/////// STATS ////////////////////////////////////////////////////////////////

export async function getCount () {
   const res = await fetch(`${baseUrl}/api/file/count`, {
      headers: getAuthHeader(),
   })
   if (res.status === 401) {
      throw {status: 401, message: "auth required"}
   }
   return res.json()
}

export async function getFileSize () {
   const res = await fetch(`${baseUrl}/api/file/size`, {
      headers: getAuthHeader(),
   })
   if (res.status === 401) {
      throw {status: 401, message: "auth required"}
   }
   return res.json()
}

/////// AUTH ////////////////////////////////////////////////////////////////

export async function testAuth (login, password) {
   try {
      const res = await fetch(`${baseUrl}/api/file/list`, {
         method: "GET",
         headers: getAuthHeader(login, password),
      })
      if (res.status === 401) {
         throw {status: 401, message: "auth required"}
      }
      return await res.json()
   } catch (ex) {
      console.error(ex)
      throw ex
   }
}

function getAuthHeader (login, password) {
   const login2 = login ?? sessionStorage.getItem("login")
   const password2 = password ?? sessionStorage.getItem("password")
   if (login2 && password2) {
      return {Authorization: `Basic ${btoa(`${login2}:${password2}`)}`}
   }
   else {
      return {}
   }
}

/////// VERSION ////////////////////////////////////////////////////////////////

export async function getVersion () {
   const {data} = await fetch(`${baseUrl}/api/version`).then(res => res.json())
   return data
}
