const { Schema, model } = require("mongoose");

const messageSchema = Schema(
  {
    from: {
      type: Schema.types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    to: {
      type: Schema.types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Message", messageSchema);
