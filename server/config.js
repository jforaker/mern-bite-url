const prod = process.env.NODE_ENV === 'production';

const config = {
	mongoURL: prod ? process.env.MONGO_URL : 'mongodb://localhost:27017/mern-starter',
	port: process.env.PORT || 8000,
};

export default config;
