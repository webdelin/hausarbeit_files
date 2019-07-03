const fetch = require('node-fetch')

class DataService {
  constructor(url) {
    this.url = url
  }
  async getUser (id) {

    try {
      let response = await fetch(`${this.url}/users/${id}`)
      let data = await response.json()
      return data
    } catch(e) {
      console.log('CATCH 1: ' + e)
      throw new Error('keine daten von User')
    }

  }
  async getPost (userId) {

    try {
      let response = await fetch(`${this.url}/posts?userId=${userId}`)
      let data = await response.json()
      return data
    } catch(e) {
      console.log('CATCH 2: ' + e)
      throw new Error('keine daten von Post')
    }

  }
  async getComment (postId) {

    try {
      let response = await fetch(`${this.url}/comments?postId=${postId}`)
      let data = await response.json()
      return data
    } catch(e) {
      console.log('CATCH 2: ' + e)
      throw new Error('keine daten von Comment')
    }

  }
}

(async () => {
  let dataService = new DataService('https://jsonplaceholder.typicode.com')
  try{
    let user = await dataService.getUser(1)
    let post = await dataService.getPost(user.id)
    let comment = await dataService.getComment(post[0].id)
    console.table(user)
    console.table(post)
    console.table(comment)
  } catch(e){
    console.log('CATCH (async): ' + e)
  }
  
})()