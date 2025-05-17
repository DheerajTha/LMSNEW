import mongoose from "mongoose"
const connectDB = async () =>{
    mongoose.connection.on('connected', ()=> console.log("DataBase Connected") )

    await mongoose.connect(`${process.env.MONOG_URL}/lms`)
}


export default connectDB;