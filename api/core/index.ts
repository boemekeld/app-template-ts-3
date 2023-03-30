import { APIGatewayEvent, Context } from "aws-lambda";
import createAPI from "lambda-api";

const api = createAPI();

api.get("/", async (req, res) => {
  const fetch = require("node-fetch");

  const apiKey = process.env.TRELLO_API_KEY;
  const apiToken = process.env.TRELLO_API_TOKEN;
  const boardId = "8nuhV3Sx";

  const getCardCount = async () => {
    try {
      const response = await fetch(`https://api.trello.com/1/boards/${boardId}/cards?filter=all&key=${apiKey}&token=${apiToken}`);

      //console.log(response);

      if (!response.ok) {
        throw new Error("Erro ao buscar os cards do Trello");
      }

      const cards = await response.json();
      return cards.length;
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const cardCount = await getCardCount();

  return { totalCards: cardCount };
});

export async function handler(event: APIGatewayEvent, context: Context) {
  return await api.run(event, context);
}
