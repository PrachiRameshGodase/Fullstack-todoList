import { MongoClient } from "mongodb";
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
    
}