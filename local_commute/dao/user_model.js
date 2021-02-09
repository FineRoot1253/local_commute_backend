const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userNm: { type: String, required: true },
    state: {
        type: Number, required: true,
    },
}, {
    timestamps: true
});

userSchema.statics.create = function (payload) {
    console.log(payload);
    const user = new this(payload);
    return user.save();
};

userSchema.statics.findAll = () => this.find({});

userSchema.statics.findOneByUserId = function (userId) {
    console.log(userId);
    return this.findOne({ userId });
}

userSchema.statics.updateByUserId = function (userId, payload) {
    return this.findOneAndUpdate({ userId }, payload, { new: true });
}

userSchema.statics.deleteByUserId = function (userId) {
    return this.remove({ userId });
}


module.exports = mongoose.model('user', userSchema);