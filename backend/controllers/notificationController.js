import Notification from "../models/notificationModel.js";

// 1️⃣ Admin sends notification to agent
export const sendNotification = async (req, res) => {
  try {
    const { agentId, message } = req.body;

    const noti = await Notification.create({
      receiverId: agentId,
      message,
    });

    res.json({ success: true, noti });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Agent gets all notifications
export const getNotifications = async (req, res) => {
  try {
    const userId = req.params.id;

    const list = await Notification.find({ receiverId: userId }).sort({
      createdAt: -1,
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3️⃣ Agent marks as seen
export const markSeen = async (req, res) => {
  try {
    const { notiId } = req.body;

    await Notification.findByIdAndUpdate(notiId, { seen: true });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
