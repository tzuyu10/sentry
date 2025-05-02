import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState(""); 
    const [recentPrompt, setRecentPrompt] = useState(""); 
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + (index === 0 ? "" : " ") + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
      setLoading(false)
      setShowResult(false)
    }

    const onSent = async (prompt) => {
        try {
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let reply 
            if (prompt !== undefined){
              let reply = await runChat(prompt);
              setRecentPrompt(prompt)
            } else {
              setPreviousPrompt(prev=>[...prev,input])
              setRecentPrompt(input)
              reply = await runChat(input)
            }


            
            let replyArray = reply.split("**");
            let newReply = ""; 
            
            for(let i = 0; i < replyArray.length; i++){
                if(i % 2 === 0){
                    newReply += replyArray[i];
                }
                else {
                    newReply += `<b>${replyArray[i]}</b>`;
                }
            }
            
            let newReply2 = newReply.replace(/\n/g, "<br>");
            let newReplyArray = newReply2.split(" ");

            for (let i = 0; i < newReplyArray.length; i++){
                const nextWord = newReplyArray[i];
                delayPara(i, nextWord);
            }
            
            setLoading(false);
            setInput("");
            return reply;
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            return null;
        }
    };

    const contextValue = {
        previousPrompt, 
        setPreviousPrompt,
        onSent, 
        setRecentPrompt, 
        recentPrompt, 
        showResult, 
        loading, 
        resultData, 
        input, 
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;