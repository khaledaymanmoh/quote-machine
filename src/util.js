import axios from "axios";

export const getQuote = async () => {
    try {
        const response = await axios.get("https://api.quotable.io/random")
        const quote = response.data.content
        const author = response.data.author
        return { quote, author }
    } catch (err) {
        console.log(err)

    }

}