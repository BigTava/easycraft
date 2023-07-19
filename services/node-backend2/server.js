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

async function getOrders(client) {
    const orderList = await client.executeQuery(`
    query {
      viewer {
        orderList(last:300) { 
          edges {
            node {
              order_id
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

    return orderList.data.viewer.orderList.edges.map(k => k.node);
}

app.get('/orders', async (req, res) => {
    const client = await authenticate()
    const orders = await getOrders(client)

    res.json(orders);
});

app.get('/orders/:id', async (req, res) => {
    const itemId = req.params.id;

    console.log("itemId", itemId);

    const client = await authenticate()
    const suppliersList = await getOrders(client)

    const item = suppliersList.find(item => item.order_id === itemId);
    if (!item) {
        res.status(404).json({ message: 'Item not found' });
    } else {
        res.json(item);
    }
});

app.post('/orders', async (req, res) => {
    const client = await authenticate()
    const resCreateOrder = await client.executeQuery(`
    mutation {
        createOrder(input: {
        content: {
            order_id: """${req.body.order_id}""",
            product_name: """${req.body.product_name}""",
            material: """${req.body.meterial}""",
            supplier_id: """${req.body.supplier_id}""",
            capacity_id: """${req.body.capacity_id}""",
        }
        })
        {
        document {
            order_id
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

async function getCapacities(client) {
    const resCreateCapacitylist = await client.executeQuery(`
    query {
    viewer {
        capacity3List(last:300) { 
        edges {
            node {
            product_type
            material
            capacity_idd,
            capacity,
            supplier_id,
            lead_time,
            tolerance
            }
        }
        }
    }
    }
`)
console.log("resCreateCapacitylist", resCreateCapacitylist);

    return resCreateCapacitylist.data.viewer.capacity3List.edges.map(k => ({...k.node, capacity_id: k.node.capacity_idd}))
}

app.get('/capacities', async (req, res) => {
    const client = await authenticate()
    const capacities = await getCapacities(client)
  

    res.json(
        capacities
    );
});

app.get('/capacities/:id', async (req, res) => {
    const itemId = req.params.id;

    console.log("itemId", itemId);

    const client = await authenticate()
    const suppliersList = await getCapacities(client)

    const item = suppliersList.find(item => item.capacity_idd === itemId);
    if (!item) {
        res.status(404).json({ message: 'Item not found' });
    } else {
        res.json(item);
    }
});

app.post('/capacities', async (req, res) => {
    const client = await authenticate()
   const resCreateCapacity = await client.executeQuery(`
mutation {
    createCapacity3(input: {
      content: {
        capacity_idd: """${req.body.capacity_id}""",
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
        capacity_idd
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
    const suppliersList = await getSuppliers(client)

    res.json(suppliersList);
});

async function getSuppliers(client) {
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

    return suppliersList.data.viewer.supplierList.edges.map(k => k.node)
}

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
    const suppliersList = await getSuppliers(client)

    const item = suppliersList.find(item => item.supplier_id === itemId);
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
