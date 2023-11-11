// const mongoose = require("mongoose");

// const connectDB = () =>{
//     mongoose.connect("mongodb+srv://nodeboy:yourPasswordHere@nodeboycluster0.ysgmfhi.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority");

// //     mongoose
// //         .connect("mongodb+srv://nodeboy:nodeboy@cluster0.ysgmfhi.mongodb.net/?retryWrites=true",{
// //         dbName:"backendapi",
// // })
//     .then((c) => console.log(`database connected with ${c.connection.host}`))
//     .catch((e) => console.log(e));
// };
// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb+srv://nodeboy:nodeboy@cluster0.zamv3wa.mongodb.net/backendapi?retryWrites=true", {
        useNewUrlParser: true, // Add this option to use the new parser
        useUnifiedTopology: true, // Add this option to use the new topology engine
    })
    .then((c) => console.log(`database connected with ${c.connection.host}`))
    .catch((error) => console.error("Error connecting to database:", error));
};

module.exports = connectDB;
