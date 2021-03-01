import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/edu', { useNewUrlParser: true, useUnifiedTopology: true });

const userInfoSchema = mongoose.Schema({
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    userAvater: { type: String, required: true },
    userEmail: { type: String, required: true },
});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);
export default UserInfo;