import http from 'k6/http'
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

// export const options = {
//     vus: 10,
//     duration: '3s'
// }

export default function() {
    let response = http.get('https://reqres.in/api/users?page=2')
    const res = response.json()
    const firstName = res['data'][0]["first_name"]
    const Email = res ['data'][0]["email"]
    expect(Email, "Assertion Email").to.equal('michael.lawson@reqres.in')
    expect(firstName, "Assertion Name").to.equal('Michael')
    expect(response.status, "Respone Status").to.equal(200)

}