import {createClient} from "redis"

const peer = createClient();
await peer.connect();


async function main(){
   

    while(1){

         const res = await peer.brPop("build-queue", 0);
         console.log(res.element)
        }

}
main()






