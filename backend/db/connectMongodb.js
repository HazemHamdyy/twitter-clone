import mongoose from "mongoose";

const connectMongodb = async () => {
  try{
    const connection = await mongoose.connect(process.env.DB_URL)
    console.log(`mongobd connected successfully: ${connection.connection.host }`)

  }catch(err) {
    console.error(`ERROR connecting to mongodb: ${err}`)
    process.exit(1)
  }
}

export default connectMongodb 