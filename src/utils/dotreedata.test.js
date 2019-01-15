import doTree from "./dotreedata"
import {data} from '../components/mydata'
describe("t",()=>{
    it("test",()=>{
        console.log(JSON.stringify(doTree(data,'users')))
        expect(doTree(data,'users')).not.toBeNull()
    })
})