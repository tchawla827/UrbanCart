import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function Main() {

  const [ans, setAns] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("")
  const [day, setDay] = useState(0);

  const getAnswer = async () => {

    setLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{ role: "user", content: `Generate a ${day}-day itinerary for ${question}, including famous local food and places to visit.` }],
        'temperature': 0.2,
        'max_tokens': 4000,
        'top_p': 1,
        'frequency_penalty': 0,
        'presence_penalty': 0.5
      })
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions)

    const data = response.json();
    data.then((message) => {
      setAns(message.choices[0].message.content)
      console.log(message.choices[0].message.content)
    }).catch(e =>
      console.log(e)
    )
    // setAns(completion.data.choices[0].message.content)
    setLoading(false)
  }

  // useEffect(() => {
  //   getAnswer()
  // }, [])

  return (
    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
      <input style={{
        width: 300,
        height: 50,
        borderRadius: 10,
        paddingLeft: 10
      }} placeholder='Place' onChange={(e) => { setQuestion(e.target.value); console.log(e.target.value) }} />
      <input style={{
        width: 300,
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 10
      }} placeholder='Day' onChange={(e) => { setDay(e.target.value); console.log(e.target.value) }} />
      <button style={{
        marginTop: 10,
        width: 200
      }} onClick={() => { getAnswer() }} >get response</button>
      {
        loading === true ?
          <p>Loading...</p> :
          <p style={{
            whiteSpace: 'pre-line',
            textAlign: 'left'
          }} >{ans}</p>
      }
    </div>

  )
}

export default Main