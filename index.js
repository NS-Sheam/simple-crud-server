const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json()); //for read data body from client

// 123sheamfeni
// XntB4O5GCXIvfzUy


const uri = "mongodb+srv://123sheamfeni:XntB4O5GCXIvfzUy@cluster0.k0vsmln.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userDB");
    const userCollection = database.collection("users");
    // const userCollection = client.db("userDB").collection("users");

    // Read operation 
    app.get("/users", async(req, res) =>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

      // Create operation 
    app.post("/users", async(req, res) =>{
      const user = req.body;
      console.log("New User", user);
      const result = await userCollection.insertOne(user);
      res.send(result);

    });

    // delete operation 
    app.delete("/users/:id", async (req, res) =>{
      const id = req.params.id;
      console.log("Please delete from Database", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) =>{
    res.send("simple crud is running");
})

app.listen(port, () => {
    console.log(`simple crud is running on port, ${port}`);
})