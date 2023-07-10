import { MongoClient, ObjectId } from "mongodb";



export default async function Addtodo(req,res){
    if (req.method === "POST") {
        const data = req.body;
        console.log(data);
        const client = await MongoClient.connect(
          "mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/todolist?retryWrites=true&w=majority"
        );
        const db = client.db();
    
        const meetupsCollection = db.collection("todolist");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Request successful" });

      }
      
      else if (req.method === "GET") {
        try {
          const client = await MongoClient.connect(
            "mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/todolist?retryWrites=true&w=majority"
          );
          const db = client.db();
    
          const meetupsCollection = db.collection("todolist");
          const result = await meetupsCollection.find().toArray();
          
    
          client.close();
          res.status(200).json(result);
          console.log("GEt",result)
        } catch (error) {
          console.log("Error:", error);
          res.status(500).json({ message: "Request failed" });
        }
      }
      
      else if (req.method === "DELETE") {
          // Handle the DELETE request to remove a specific todo item
          try {
            const id = req.query.id; // Extract the id from the request query parameters
            const client = await MongoClient.connect(
              "mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/todolist?retryWrites=true&w=majority"
            );
            const db = client.db();
      
            const meetupsCollection = db.collection("todolist");
            const result = await meetupsCollection.deleteOne({ _id: new ObjectId(id) });
            client.close();
      
            if (result.deletedCount === 0) {
              // If no todo item was deleted, return an error
              res.status(404).json({ message: "Todo item not found" });
            } else {
              res.status(200).json({ message: "Todo item deleted" });
            }
          } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Request failed" });
          }
        }
      }

