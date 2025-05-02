import React, { useContext } from 'react'
import './main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  return (
    <div className='main'>
        <div className='nav'>
            <p>Sentry</p>
            <img src={assets.user_icon_2} alt="user_icon"/>
        </div>
        <div className = 'main-container'>

            {!showResult
            ?
            <>
                <div className = 'greet'>
                    <p><span>Hello, Master.</span></p>
                    <p>How can I serve you today?</p>
                </div> 
            
                <div className = 'cards'>
                    <div className = 'card'> 
                        <p>Suggest a shitty food place for my upcoming birthday</p>
                        <img src={assets.compass_icon} alt="compass_icon"/>
                    </div>
                    <div className = 'card'> 
                        <p>Briefly summarize this concept: networking</p>
                        <img src={assets.bulb_icon} alt="bulb_icon"/>
                    </div>
                    <div className = 'card'> 
                        <p>Provide team building activities except infidelity</p>
                        <img src={assets.message_icon} alt="message_icon"/>
                    </div>
                    <div className = 'card'> 
                        <p>Provide a code my peasant about djiksta's algorithm</p>
                        <img src={assets.code_icon} alt="code_icon"/>
                    </div>
                </div>
            </>
            :<div className='result'>
                <div className='result-title'>
                    <img src={assets.user_icon_2} alt = "user_icon"/>
                    <p>{recentPrompt}</p>
                </div>        
                <div className='result-data'>
                    <img src={assets.sentry_logo} alt='sentry'/>
                    {loading
                    ?<div className='loader'> 
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>    
            </div>
            }
            <div className = 'main-bottom'>
                <div className='search-box'>
                    <input onChange={(e)=>setInput(e.target.value)} 
                    onKeyDown={(e)=> {if (e.key=== 'Enter')onSent();}}
                    value={input} type='text' placeholder='Enter a stupid ass prompt here'/>
                    <div>
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="send_icon"/>
                    </div> 
                </div>
                <p className='bottom-info'>Sentry is not that bright and is based on Gemini, it can display stupid ass responses, make sure to double check its responses.</p>
            </div>
        </div>
    </div>
  )
}

export default Main