import mongoose from 'mongoose';

// const Connection = async (username, password) => {
//     const URL = `mongodb+srv://${username}:${password}@cluster0.u6u38bx.mongodb.net/sundarban?retryWrites=true&w=majority`;
//     try {
//         await mongoose.connect(URL, { useNewUrlParser: true })
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.log('Error while connecting to the database ', error);
//     }
// };

// export default Connection;


const Connection = async() => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true, 
	};
	
	let DB="mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/MERNstak?retryWrites=true&w=majority";
	try {
	   mongoose.connect(DB, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
export default Connection;