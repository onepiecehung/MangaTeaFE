const UserModel = require("../../database/mongo/model/user.model")

export async function save(userInfo) {
    return userInfo.save()
}

export async function create(userInfo) {
    const userClass = new UserModel(userInfo);
    return userClass.save();
}

export async function findEmail(email) {
    return UserModel.find({ email: email })
}

export async function findUsername(username) {
    return UserModel.find({ username: username })
}