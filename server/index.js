import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
// import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

import { userRoute } from "./routes/user.route.js";
import { surveyRoute } from "./routes/survey.route.js";
import { DB_URI, PORT } from "./constants/getenv.constant.js";


const app = express();
const port = PORT || 5000;

// console.log(DB_URI);


app.use(cors());
app.use(express.json());

const uri = DB_URI;
connectDB(uri);

app.use("/user", userRoute);

app.use("/survey", surveyRoute)

app.use("/", (req, res) =>{
  res.status(200).json({
    success: true,
    message: "Its ok", 
  });
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     await client.connect();
//     const userCollection = client.db("surveyDB").collection("users");
//     const surveyCollection = client.db("surveyDB").collection("surveys");
//     const reportCollection = client.db("surveyDB").collection("reports");
//     const votedCollection = client.db("surveyDB").collection("voted");

//     const commentsCollection = client.db("surveyDB").collection("comments");

//     const likeCollection = client.db("surveyDB").collection("like");
//     const dislikeCollection = client.db("surveyDB").collection("dislike");
//     const yesCollection = client.db("surveyDB").collection("yes");
//     const noCollection = client.db("surveyDB").collection("no");

//     /*
//      ** User verification methods
//      * start
//      */
//     const findUser = async (req, res, next) => {
//       const email = req.headers.email;
//       const query = { email: email };
//       const result = await userCollection.findOne(query);
//       req.result = result;

//       next();
//     }; 

//     /*
//      ** User verification methods
//      * ends here
//      */

//     app.get("/", (req, res) => {
//       res.send("Sweet Home");
//     });

//     // all methods for user
//     // TODO: Need to add JWT
//     app.get("/users", findUser, async (req, res) => {
//       //! user should be veriied
//       if (!req.result) {
//         return res.send([]);
//       }

//       if (req.result.access != process.env.ADMIN) {
//         return res.send([]);
//       }
//       const query = userCollection.find();
//       const result = await query.toArray();
//       res.send(result);
//     });

//     app.get("/users/:email", async (req, res) => {
//       // console.log("abcd")
//       const email = req.params.email;
//       const query = { email: email };
//       const result = await userCollection.findOne(query);
//       // console.log(result);
//       res.send(result);
//     });

//     app.post("/users/:email", async (req, res) => {
//       // console.log("Called");
//       const user = req.body;
//       const email = req.body.email;
//       const query = { email: email };
//       const userData = await userCollection.findOne(query);
//       if (userData) {
//         // console.log(userData);
//         res.send(userData);
//         return;
//       }
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     app.delete("/users/:id", findUser, async (req, res) => {
//       //! user should be veriied
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       if (req.result.access != process.env.ADMIN) {
//         return res.send({ error: "bad request" });
//       }
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await userCollection.deleteOne(query);
//       res.send(result);
//     });

//     app.put("/user/:id", async (req, res) => {
//       //! user should be veriied
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const options = { upsert: false };
//       const updateUser = req.body;

//       const setUser = {
//         $set: {
//           ...updateUser,
//         },
//       };
//       const result = await userCollection.updateOne(query, setUser, options);
//       res.send(result);
//     });

//     app.put("/pro", findUser, async (req, res) => {
//       if(req.result.access!==process.env.USER) {
//         return req.send({});
//       }
//       const id = req.params.id;
//       const query = { email: req.result.email };
//       const options = { upsert: false };
//       const user = req.result;
//       const access = process.env.PRO_USER;

//       // console.log("Call Hoise");

//       const setUser = {
//         $set: {
//           ...user,
//           access
//         },
//       };
//       const result = await userCollection.updateOne(query, setUser, options);
//       res.send(result);
//     });

//     // all methods for survey------------------------------------------------------------------------------
//     //* Survey post method
//     app.post("/createsurvey", findUser, async (req, res) => {
//       //! user should be veriied
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       if (req.result.access != process.env.SURVEYOR) {
//         return res.send({ error: "bad request" });
//       }
//       const survey = req.body;
//       const result = await surveyCollection.insertOne(survey);
//       res.send(result);
//     });

//     //* surveyor can find thier surveys
//     app.get("/mysurvey", findUser, async (req, res) => {
//       //! user should be veriied as surveyor
//       if (req.result.access == process.env.SURVEYOR) {
//         const email = req.headers.email;
//         const query = { email: email };
//         const result = await surveyCollection
//           .find(query)
//           .sort({ _id: -1 })
//           .toArray();
//         // console.log("--------");
//         console.log(result);  
//         res.send(result);
//         return;
//       }
//       res.send([]); 
//     });

//     app.get("/allsurveyadmin", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send([]);
//       }
//       if (req.result.access == process.env.ADMIN) {
//         // TODO: this is for admin
//         const result = await surveyCollection.find().toArray();
//         return res.send(result);
//       }
//       return res.send([]);
//     });

//     //* all surveys for admin and user and surveyor
//     app.get("/allsurvey", findUser, async (req, res) => {
//       //! user should be veriied
//       if (!req.result) {
//         return res.send([]);
//       }
//       // console.log(req.result.access);
//       const query = { status: "active" };
//       const result = await surveyCollection
//         .find(query)
//         .sort({ _id: -1 })
//         .toArray();
//       return res.send(result);
//     });

//     app.get("/featured", findUser, async (req, res) => {
//       //! user should be veriied

//       const result = await surveyCollection
//         .find({ status: "active" })
//         .sort({ vote: -1 })
//         .limit(6)
//         .toArray();

//       res.send(result);
//     });

//     app.get("/latest", findUser, async (req, res) => {
//       //! user should be veriied
//       const result = await surveyCollection
//         .find({ status: "active" })
//         .sort({ _id: -1 })
//         .limit(6)
//         .toArray();

//       res.send(result);
//     });

//     //* Survey details from here--------
//     app.get("/surveydetails/:id", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send({ error: "bad request null" });
//       }

//       if (
//         req.result.access == process.env.SURVEYOR ||
//         req.result.access == process.env.ADMIN ||
//         req.result.access == process.env.PRO_USER ||
//         req.result.access == process.env.USER
//       ) {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await surveyCollection.findOne(query);
//         return res.send(result);
//       }
//       return res.send({ error: "bad request last" });
//     });

//     //* Reaction and comment-==============-------------==============------>>>>>>>>>>>>>>>>>>>>>>>

//     app.post("/like/:surveyId", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;

//       const dislikeResult = await dislikeCollection.findOne({
//         surveyId,
//         email,
//       });
//       if (dislikeResult) {
//         const deleteResult = await dislikeCollection.deleteOne({
//           surveyId,
//           email,
//         });
//       }

//       const likeResult = await likeCollection.findOne({ surveyId, email });
//       if (likeResult) {
//         const likeDeleteResult = await likeCollection.deleteOne({
//           surveyId,
//           email,
//         });
//         return res.send({ success: "Like removed successfully" });
//       }

//       const query = { _id: new ObjectId(surveyId) };

//       const survey = await surveyCollection.findOne(query);
//       const newSurvey = {
//         ...survey,
//         like: survey?.like + 1,
//       };
//       // console.log(newSurvey);

//       const updateResult = await surveyCollection.updateOne(
//         query,
//         {
//           $set: {
//             ...newSurvey,
//           },
//         },
//         { upsert: false }
//       );

//       // console.log(updateResult);
//       const newLikeResult = await likeCollection.insertOne({ surveyId, email });
//       return res.send({ ...newLikeResult, success: "Like added successfully" });
//     });

//     app.post("/dislike/:surveyId", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;

//       const likeResult = await likeCollection.findOne({ surveyId, email });
//       if (likeResult) {
//         const deleteResult = await likeCollection.deleteOne({
//           surveyId,
//           email,
//         });

//         const query = { _id: new ObjectId(surveyId) };
//         const survey = await surveyCollection.findOne(query);
//         const newSurvey = {
//           ...survey,
//           like: survey?.like - 1,
//         };

//         // console.log(newSurvey);

//         const updateResult = await surveyCollection.updateOne(
//           { _id: new ObjectId(surveyId) },
//           {
//             $set: {
//               ...newSurvey,
//             },
//           },
//           { upsert: false }
//         );
//       }

//       const dislikeResult = await dislikeCollection.findOne({
//         surveyId,
//         email,
//       });
//       if (dislikeResult) {
//         const dislikeDeleteResult = await dislikeCollection.deleteOne({
//           surveyId,
//           email,
//         });
//         return res.send({ success: "Dislike removed successfully" });
//       }
//       const newDislikeResult = await dislikeCollection.insertOne({
//         surveyId,
//         email,
//       });
//       return res.send({
//         ...newDislikeResult,
//         success: "Dislike added successfully",
//       });
//     });

//     app.get("/liked/:surveyId", async (req, res) => {
//       // to get someone liked or not
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const liked = await likeCollection.findOne({ surveyId, email });
//       if (liked) return res.send({ liked: true });
//       return res.send({ liked: false });
//     });

//     app.get("/like/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const likeCount = await likeCollection.find({ surveyId }).toArray();
//       return res.send({ likeCount: likeCount.length });
//     });

//     app.get("/disliked/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const disliked = await dislikeCollection.findOne({ surveyId, email });
//       if (disliked) return res.send({ disliked: true });
//       return res.send({ disliked: false });
//     });

//     app.get("/dislike/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const dislikeCount = await dislikeCollection.find({ surveyId }).toArray();
//       return res.send({ dislikeCount: dislikeCount.length });
//     });

//     app.post("/yes/:surveyId", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       const time = moment().format();

//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;

//       const noResult = await noCollection.findOne({ surveyId, email });
//       if (noResult) {
//         const deleteResult = await noCollection.deleteOne({ surveyId, email });
//       }

//       const yesResult = await yesCollection.findOne({ surveyId, email });
//       if (yesResult) {
//         const yesDeleteResult = await yesCollection.deleteOne({
//           surveyId,
//           email,
//         });
//         return res.send({ success: "Vote removed successfully" });
//       }
//       if (!noResult) {
//         const query = { _id: new ObjectId(surveyId) };

//         const survey = await surveyCollection.findOne(query);
//         const newSurvey = {
//           ...survey,
//           vote: survey?.vote + 1,
//         };
//         // console.log(newSurvey);

//         const updateResult = await surveyCollection.updateOne(
//           query,
//           {
//             $set: {
//               ...newSurvey,
//             },
//           },
//           { upsert: false }
//         );
//       }
      
//       const newYesResult = await yesCollection.insertOne({ surveyId, ...req.result, time });
//       return res.send({ ...newYesResult, success: "Vote added successfully" });
//     });

//     app.post("/no/:surveyId", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send({ error: "bad request" });
//       }

//       const time = moment().format();

//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const body = req.body;
//       // console.log(body);

//       const yesResult = await yesCollection.findOne({ surveyId, email });
//       if (yesResult) {
//         const deleteResult = await yesCollection.deleteOne({ surveyId, email });
//       }

//       const noResult = await noCollection.findOne({ surveyId, email });
//       if (noResult) {
//         const noDeleteResult = await noCollection.deleteOne({
//           surveyId,
//           email,
//         });
//         return res.send({ success: "Vote removed successfully" });
//       }
//       if (!yesResult) {
//         const query = { _id: new ObjectId(surveyId) };

//         const survey = await surveyCollection.findOne(query);
//         const newSurvey = {
//           ...survey,
//           vote: survey?.vote + 1,
//         };
//         // console.log(newSurvey);

//         const updateResult = await surveyCollection.updateOne(
//           query,
//           {
//             $set: {
//               ...newSurvey,
//             },
//           },
//           { upsert: false }
//         );
//       }
//       const newNoResult = await noCollection.insertOne({ surveyId, ...req.result, time });
//       return res.send({ ...newNoResult, success: "Vote added successfully" });
//     });

//     app.get("/yesvoted/:surveyId", async (req, res) => {
//       // to get someone voted or not
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const yesvoted = await yesCollection.findOne({ surveyId, email });
//       if (yesvoted) return res.send({ yesvoted: true });
//       return res.send({ yesvoted: false });
//     });

//     app.get("/yescount/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const yesCount = await yesCollection.find({ surveyId }).toArray();
//       return res.send({ yesCount: yesCount.length });
//     });

//     app.get("/novoted/:surveyId", async (req, res) => {
//       // to get someone voted or not
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const novoted = await noCollection.findOne({ surveyId, email });
//       if (novoted) return res.send({ novoted: true });
//       return res.send({ novoted: false });
//     });

//     app.get("/nocount/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const noCount = await noCollection.find({ surveyId }).toArray();
//       return res.send({ noCount: noCount.length });
//     });

//     app.get("/totalvote/:surveyId", async (req, res) => {
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const yesCount = await yesCollection.find({ surveyId }).toArray();
//       const noCount = await noCollection.find({ surveyId }).toArray();
//       return res.send({ totalVote: yesCount.length + noCount.length });
//     });

    

//     app.post("/comment/:surveyId", findUser, async (req, res) => {
//       if (req.result.access !== process.env.PRO_USER) {
//         return res.send({});
//       }
//       const time = moment().format();
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const comment = req.body.input;
//       const user = await userCollection.findOne({email});
//       const {name} = user;
//       const result = await commentsCollection.insertOne({ comment, surveyId, name, email, time });
//       return res.send(result);
//     });

//     app.get("/comments/:surveyId", findUser, async (req, res) => {
//       if (!req.result) {
//         return res.send([]);
//       }
//       const surveyId = req.params.surveyId;
//       const email = req.headers.email;
//       const result = await commentsCollection.find({surveyId}).sort({_id: -1}).toArray();
//       return res.send(result);
//     });

//     app.listen(port, () => {
//       console.log(`http://localhost:${port}`);
//     });

//     // await client.db("admin").command({ ping: 1 });
//     // console.log(
//     //   "Pinged your deployment. You successfully connected to MongoDB!"
//     // );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);
