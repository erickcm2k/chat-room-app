const Message = require("../models/message");

const getMessages = async (req, res ) => {
  const myId = req.uid;
  const from = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: from },
      { from: from, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    last30,
  });
};

module.exports = { getMessages };
