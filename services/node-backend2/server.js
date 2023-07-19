import { readFileSync, readdirSync } from 'fs';
import { fromString } from "uint8arrays";;
import { DID } from 'dids';
import { getResolver } from 'key-did-resolver';
import { Ed25519Provider } from 'key-did-provider-ed25519';

import { definition } from './definition.js';

import express from 'express';
const app = express();
const port = 3333;

app.use(express.json());

let ComposeClient;
import('@composedb/client').then((module) => {
    ComposeClient = module.ComposeClient;
}).catch(err => console.log(err));

// Sample data
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

const authenticate = async () => {
    const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
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
    return compose
}

app.get('/orders', async (req, res) => {
    const client = await authenticate()
    const orderList = await client.executeQuery(`
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

    res.json(orderList.data.viewer.orderList.edges.map(k => JSON.stringify(k)));
});

app.post('/orders', async (req, res) => {
    const client = await authenticate()
    const resCreateOrder = await client.executeQuery(`
    mutation {
        createOrder(input: {
        content: {
            product_name: """${req.body.product_name}""",
            material: """${req.body.meterial}""",
            supplier_id: """${req.body.supplier_id}""",
            capacity_id: """${req.body.capacity_id}""",
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

    res.status(201).json(resCreateOrder);
});

app.get('/capacities', async (req, res) => {
    const client = await authenticate()

    const resCreateCapacitylist = await client.executeQuery(`
    query {
    viewer {
        capacity3List(last:300) { 
        edges {
            node {
            product_type
            material
            supplier_id,
            capacity,
            lead_time,
            tolerance
            }
        }
        }
    }
    }
`)

    res.json(resCreateCapacitylist.data.viewer.capacity3List.edges.map(k => JSON.stringify(k)));
});

app.post('/capacities', async (req, res) => {
    const client = await authenticate()
   const resCreateCapacity = await client.executeQuery(`
mutation {
    createCapacity3(input: {
      content: {
        product_type: """${req.body.product_type}""",
        material: """${req.body.meterial}""",
        supplier_id: """${req.body.supplier_id}""",
        capacity: ${req.body.capacity},
        lead_time: ${req.body.lead_time},
        tolerance: ${req.body.tolerance}
      }
    })
    {
      document {
        product_type
        material
        supplier_id,
        capacity,
        lead_time,
        tolerance
      }
    }
  }
`)

    res.status(201).json(resCreateCapacity);
});



app.get('/suppliers', async (req, res) => {
    const client = await authenticate()
    const suppliersList = await client.executeQuery(`
    query {
    viewer {
        supplierList(last:300) { 
        edges {
            node {
            supplier_name
            supplier_id
            location
            }
        }
        }
    }
    }
    `)

    res.json(suppliersList.data.viewer.supplierList.edges.map(k => k.node));
});

app.post('/suppliers', async (req, res) => {
    const client = await authenticate()
   const resCreate = await client.executeQuery(`
mutation {
    createSupplier(input: {
      content: {
        supplier_name: """${req.body.supplier_name}""",
        supplier_id: """${req.body.supplier_id}""",
        location: """${req.body.location}"""
      }
    })
    {
      document {
        supplier_name
        supplier_id
        location
      }
    }
  }
`)

    res.status(201).json(resCreate);
});

// GET endpoint to retrieve a specific item by id
app.get('/suppliers/:id', async (req, res) => {
    const itemId = req.params.id;

    console.log("itemId", itemId);

    const client = await authenticate()
    const suppliersList = await client.executeQuery(`
    query {
    viewer {
        supplierList(last:300) { 
        edges {
            node {
            supplier_name
            supplier_id
            location
            }
        }
        }
    }
    }
    `)

    console.log("suppliersList.data.viewer.supplierList.edges", suppliersList.data.viewer.supplierList.edges);

    const item = suppliersList.data.viewer.supplierList.edges.find(item => item.node.supplier_id === itemId)?.node;
    if (!item) {
        res.status(404).json({ message: 'Item not found' });
    } else {
        res.json(item);
    }
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});

// Server listening
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
