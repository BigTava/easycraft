// Import ComposeDB client

import { ComposeClient }from '@composedb/client'
import { readFileSync, readdirSync } from 'fs';
import { fromString } from "uint8arrays/from-string";
import { DID } from 'dids';
import { getResolver } from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";

// Import your compiled composite

// import { definition }from '../src/__generated__/definition.js'
import {definition} from '../src/__generated__/definition.mjs';

console.log("definition", definition);

// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })

const authenticate = async () => {
  const seed = readFileSync('./admin_seed.txt')
  const key = fromString(
    seed,
    "base16"
  );
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key)
  })
  await did.authenticate()
  compose.setDID(did)
  // compose.did = did
}

await authenticate()
// const auth = await compose.setDID("did:key:z6MkfuigJH7DXP6PiYpMVLvsX1Ak2CYKmMEX488zCub9tvwP#z6MkfuigJH7DXP6PiYpMVLvsX1Ak2CYKmMEX488zCub9tvwP")


// const resCreate = await compose.executeQuery(`
// mutation {
//     createCapacity(input: {
//       content: {
//         product_type: """${"hello"}"""
//       }
//     })
//     {
//       document {
//         product_type
//       }
//     }
//   }
// `)

// console.log("resCreate", resCreate);


const resCreateOrder = await compose.executeQuery(`
mutation {
    createOrder(input: {
      content: {
        product_name: """${"typpe"}""",
        material: """${"mattt"}""",
        supplier_id: """${"supppId2"}""",
        capacity_id: """${"supppId2"}""",
      }
    })
    {
      document {
        product_name
        material
        supplier_id,
        capacity_id,
      }
    }
  }
`)

console.log("resCreateOrder", resCreateOrder);

const resCreateOrderList = await compose.executeQuery(`
query {
  viewer {
    orderList(last:300) { 
      edges {
        node {
          product_name
          material
          supplier_id,
          capacity_id,
        }
      }
    }
  }
}
`)

console.log("resCreateOrderList", resCreateOrderList.data.viewer.orderList.edges.map(k => JSON.stringify(k)))


// const resCreateCapacity = await compose.executeQuery(`
// mutation {
//     createCapacity3(input: {
//       content: {
//         product_type: """${"typpe"}""",
//         material: """${"mattt"}""",
//         supplier_id: """${"supppId2"}""",
//         capacity: 10,
//         lead_time: 100,
//         tolerance: 0.1
//       }
//     })
//     {
//       document {
//         product_type
//         material
//         supplier_id,
//         capacity,
//         lead_time,
//         tolerance
//       }
//     }
//   }
// `)

// console.log("resCreateCapacity", resCreateCapacity);

// const resCreateCapacitylist = await compose.executeQuery(`
// query {
//   viewer {
//     capacity3List(last:300) { 
//       edges {
//         node {
//           product_type
//           material
//           supplier_id,
//           capacity,
//           lead_time,
//           tolerance
//         }
//       }
//     }
//   }
// }
// `)

// console.log("capacity3List", resCreateCapacitylist.data.viewer.capacity3List.edges.map(k => JSON.stringify(k)))


// console.log("res", res.data.viewer.supplierList.edges.map(k => JSON.stringify(k)))



// const resCreate = await compose.executeQuery(`
// mutation {
//     createSupplier(input: {
//       content: {
//         supplier_name: """${"hisName"}""",
//         supplier_id: """${"idddd"}""",
//         location: """${"locationnn"}"""
//       }
//     })
//     {
//       document {
//         supplier_name
//         supplier_id
//         location
//       }
//     }
//   }
// `)

// console.log("resCreate", resCreate);

// const res = await compose.executeQuery(`
// query {
//   viewer {
//     supplierList(last:300) { 
//       edges {
//         node {
//           supplier_name
//           supplier_id
//           location
//         }
//       }
//     }
//   }
// }
// `)


// console.log("res", res.data.viewer.supplierList.edges.map(k => JSON.stringify(k)))
