import mongoose  from "mongoose";
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD), {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
        console.log(`MongoDB Connected Successfully`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
      }
}

export default connectDB