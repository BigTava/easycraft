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
console.log("auth", compose.did);


const resCreate = await compose.executeQuery(`
mutation {
    createCapacity(input: {
      content: {
        displayName: """${"hello"}"""
      }
    })
    {
      document {
        displayName
      }
    }
  }
`)

console.log("resCreate", resCreate);


const res = await compose.executeQuery(`
query {
  viewer {
    capacity {
      id
      displayName
    }
  }
}
`)

console.log("res", res.data)
