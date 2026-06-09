const axios = require("axios");

const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",

        messages: [
          {
            role: "system",
            content:
              "You are a healthcare assistant. Provide possible conditions, urgency level, recommended action and home care tips. Mention clearly that this is not a diagnosis.",
          },

          {
            role: "user",
            content: symptoms,
          },
        ],
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    const result =
      response.data.choices[0]
        .message.content;

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(
      error.response?.data ||
        error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data ||
        error.message,
    });
  }
};

module.exports = {
  checkSymptoms,
};