const baseUrl = 'http://localhost:3002'

export function getFiles() {
      return fetch(`${baseUrl}/api/file/list`).then(res => res.json())
}
