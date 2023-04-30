import {useState, useRef, useEffect} from 'react'
import {AiOutlineArrowDown as Down, AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right, AiOutlineArrowUp as Up} from 'react-icons/ai'
import {GiDragonHead} from 'react-icons/gi'
import Logo from "../assets/Logo_noback.png"


const ControlBtn = ({children, ClickHangler, Ref, styles}) =>{

     return(
          <button ref={Ref} style={styles} onClick={ClickHangler} className='control-btn'>
               {children}
          </button>
     )
}


const Dot = ({Ref, styles}) => {
     return(
          <div ref={Ref} style={styles} className='dotBody'>

          </div>
     )
}

const Body = () => {
     const moveTarget = (min, max) =>{
          return Math.floor(Math.random() * ((max - min) + 1) + min)
     }
     //states
     const [stBtn, setStBtn] = useState("Start") 
     const [lastMove, setLastMove] = useState(0) 
     const [target, setTarget] = useState({
          x: moveTarget(1, 32) * 3, y: moveTarget(1,19) * 5
     })

     const [snakeHead, setSnakeHead] = useState({
          pos: {x: 150, y: moveTarget(1,19) * 5},
          move: moveTarget(-2,2),
          count: 0,
          temp: 0
     })

     const [dotPos, setDotPos] = useState({
          x: snakeHead.pos.x + 3, y: snakeHead.pos.y,
     })

     const [snakeBody, setSnakeBody] = useState([{}]) 
     const [count, setCount] = useState(1)
     const [cover, setCover] = useState({
          status: 1,
          display:"flex"
     })
     const [controls, setControls] = useState({
          width:"100px",
          Left: {top:"0%", left: "0%", width: "100%"},
          Right: {top:"0%", left: "0%", width: "100%"}, 
          Up: {top:"0%", left: "0%", width: "100%"}, 
          Down: {top:"0%", left: "0%", width: "100%"},
          Center: {width:"100%", "z-index": "99"}
     })

     //Refs
     const dotRef = useRef(null) // gettting the snake head
     const btnRef = useRef(null)
     const title = useRef(null)
     const bodyRef = useRef(null)
     const dot = useRef(null)
     const targetRef = useRef(null)
     const tRef = useRef(null)
     const coverRef = useRef(null)


     // sleep function
     function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
     }

     // random number generator
     const GameControl = () => {
          if(stBtn === "Continue"){
               //setMove(temp)
               setControls((prev) => ({
                    ...prev,
                    width:"clamp(200px, 20%, 600px)",
                    Left: {left:"-12.5%", top:"35%",width: "clamp(40px, 30%, 100px)"},
                    Right: {right:"-12.5%", top:"35%", width: "clamp(40px, 30%, 100px)"}, 
                    Up: {left:"35%", top:"-12.5%", width: "clamp(40px, 30%, 100px)"}, 
                    Down: {left:"35%", bottom:"-12.5%", width: "clamp(40px, 30%, 100px)"},
                    Center: {width:"40%", "z-index": "99"}
               }))
               setSnakeHead((prev) => ({...prev, move: lastMove}))
               btnRef.current.style.background = '#aa6000'
               setStBtn("Stop")
          }
          if(stBtn === "Stop"){
               setControls((prev) => ({
                    ...prev,
                    width:"100px",
                    Left: {top:"0%", left: "0%", width: "100%"},
                    Right: {top:"0%", left: "0%", width: "100%"}, 
                    Up: {top:"0%", left: "0%", width: "100%"}, 
                    Down: {top:"0%", left: "0%", width: "100%"},
                    Center: {width:"100%", "z-index": "99"}
               }))
               setSnakeHead((prev) => ({...prev, move: 0, temp: 1}))
               btnRef.current.style.background = '#00aa47'
               setStBtn("Continue")
          }
          if(stBtn === "Start"){
               setCover((prev) => ({...prev, status: 0, display: "none"}))
               btnRef.current.style.background = '#aa6000'
               setControls((prev) => ({
                    ...prev,
                    width:"clamp(200px, 20%, 600px)",
                    Left: {left:"-12.5%", top:"35%",width: "clamp(40px, 30%, 100px)"},
                    Right: {right:"-12.5%", top:"35%", width: "clamp(40px, 30%, 100px)"}, 
                    Up: {left:"35%", top:"-12.5%", width: "clamp(40px, 30%, 100px)"}, 
                    Down: {left:"35%", bottom:"-12.5%", width: "clamp(40px, 30%, 100px)"},
                    Center: {width:"40%", "z-index": "99"}
               }))
               setSnakeHead((prev) => ({...prev, pos: {x: moveTarget(6, 30) * 3, y: moveTarget(6,19) * 5}}))
               setStBtn("Stop")
          }
          if(stBtn === "Game Over"){
               btnRef.current.style.background = '#13869b'
               setSnakeBody({})
               setSnakeHead((prev) => ({...prev, count:0}))
               setStBtn("Start")
          }
          
     }

     const changeWhite = () => {
          if(stBtn !== "Start"){
               title.current.style.color = "white"
          }
          
     }

     
     useEffect( () => {
          
          const moveSnake =  async () =>{
               if(cover.status){
                    return
               }
               if(stBtn === "Start"){
                    GameControl()
               }else if((stBtn === "Continue" || stBtn === "Game Over") && snakeHead.temp === 1){
                    return
               }
               

          /* / if(bodyRef.current){
               
                    bodyRef.current.addEventListener("keydown", (event) => {
                         console.log(event.key)
                         if(event.key === "ArrowUp"){
                             // move === -2 ? setMove(-2) : setMove(2)
                              snakeHead.move === -2 ? setSnakeHead((prev) => ({...prev, move:-2})) : setSnakeHead((prev) => ({...prev, move:2}))
                         }else if(event.key === "ArrowDown"){
                             // move === 2 ? setMove(2) : setMove(-2)
                              snakeHead.move === 2 ? setSnakeHead((prev) => ({...prev, move:2})) : setSnakeHead((prev) => ({...prev, move:-2}))
                         } else if(event.key === "ArrowRight"){
                            //  move === -1 ? setMove(-1) : setMove(1)
                              snakeHead.move === -1 ? setSnakeHead((prev) => ({...prev, move:-1})) : setSnakeHead((prev) => ({...prev, move:1}))
                         }else if(event.key === "ArrowLeft"){
                              //move === 1 ? setMove(1) : setMove(-1)
                              snakeHead.move === 1 ? setSnakeHead((prev) => ({...prev, move:1})) : setSnakeHead((prev) => ({...prev, move:-1}))
                         }
                    })
               / */
               await sleep(700 - (count * 5))

               if(snakeHead.move === 0){
                    return
               }else if(snakeHead.move === 1){
                   // await sleep(1000)
                    dotRef.current.style.transform = "rotateZ(180deg)"
                    dotRef.current.style.transform = "rotateY(180deg)"
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,x: snakeHead.pos.x + 3} }))
                    setLastMove(1)
               }else if(snakeHead.move === -1){
                    //await sleep(1000)
                    dotRef.current.style.transform = "rotateZ(0deg)"
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,x: snakeHead.pos.x - 3} }))
                    
                    setLastMove(-1)
               }else if(snakeHead.move === 2){
                   // await sleep(1000)
                    dotRef.current.style.transform = "rotateZ(90deg)"
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y }))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,y: snakeHead.pos.y - 5} }))
                    setLastMove(2)
               }else if(snakeHead.move === -2){
                   // await sleep(1000)
                    dotRef.current.style.transform = "rotateZ(-90deg)"
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,y: snakeHead.pos.y + 5} }))
                    setLastMove(-2)
               }

               if((lastMove === 1 && snakeHead.pos.x >= 100.5) || (lastMove === -1 && snakeHead.pos.x <= -0.5) || (lastMove === -2 && snakeHead.pos.y >= 100.5) || (lastMove === 2 && snakeHead.pos.y <= -0.5) ){
                    setSnakeHead((prev) => ({...prev, move: 0, temp: 1}))
                    setStBtn("Game Over")
                    btnRef.current.style.background = '#ff0055'
                    setControls((prev) => ({
                         ...prev,
                         width:"140px",
                         Left: {top:"0%", left: "0%", width: "100%"},
                         Right: {top:"0%", left: "0%", width: "100%"}, 
                         Up: {top:"0%", left: "0%", width: "100%"}, 
                         Down: {top:"0%", left: "0%", width: "100%"},
                         Center: {width:"100%", "z-index": "99"}
                    }))
               }
               //setSnakeHead((prev) => ({...prev, count: snakeHead.count + 1}))
          }
          moveSnake()

          if((lastMove === -1 && snakeHead.pos.x === target.x  && snakeHead.pos.y === target.y) || (lastMove === 1 && snakeHead.pos.x === target.x && snakeHead.pos.y === target.y) || (lastMove === -2 && snakeHead.pos.x === target.x && snakeHead.pos.y === target.y) || (lastMove === 2 && snakeHead.pos.x === target.x && snakeHead.pos.y === target.y) ){
               //setTarget((prev) => ({...prev, x: target.x + 40, y: target.y + 40}))
               tRef.current = {x: moveTarget(1, 32) * 3, y: moveTarget(1, 19) * 5}
               setTarget(tRef.current)
               //setTarget((prev) => ({...prev, x: moveTarget(0, 39) * 20, y: moveTarget(0,24) * 20}))
               setCount(count + 1)
               let temp = snakeBody
               temp.push({n:count,x:snakeHead.pos.x, y:snakeHead.pos.y})
               setSnakeBody(temp)
               console.log("we have met just now")
              // setSnakeBody((prev) => ([...prev, count]))
          }
     } , [snakeHead]
     )
     
     return (
          <div className='body' ref={bodyRef}>
               <div className='screenContainer' >
                    <div className='screen' >
                         <div className='snakeHead' ref={dotRef} style={{left: snakeHead.pos.x + "%", top: snakeHead.pos.y + "%",}}>
                              <i><GiDragonHead /></i>
                         </div>
                         <Dot Ref={dot} styles={{left: dotPos.x + "%", top: dotPos.y + "%"}} />
                         {   count > 1 &&  snakeBody.map((ele,index ) => (
                                   <div key={index} className='snakeBody' style={{
                                        left: dotPos.x + "%", 
                                        top: dotPos.y + "%"}} ><h3>{ele.n}</h3></div>
                         ))}
                    
                         <div className='dotBody' ref={targetRef} style={{left: target.x + "%", top:target.y + "%"}}> </div>
                    </div>
                    <div className='screenCover' ref={coverRef} style={{display: cover.display}} > <img className='Cover-Logo' src={Logo} alt="CompanyImage" /> </div>
               </div>
               <div className='controls' style={{width:controls.width}} >
                    <ControlBtn styles={controls.Left} ClickHangler={() => snakeHead.move === 1 ? setSnakeHead((prev) => ({...prev, move:1})) : setSnakeHead((prev) => ({...prev, move:-1}))} ><Left /></ControlBtn>
                    <ControlBtn styles={controls.Up}  ClickHangler={() => snakeHead.move === -2 ? setSnakeHead((prev) => ({...prev, move:-2})) : setSnakeHead((prev) => ({...prev, move:2}))} ><Up /></ControlBtn>
                    <ControlBtn styles={controls.Center}   ClickHangler={GameControl} Ref={btnRef} ><h6 onMouseOver={changeWhite} ref={title}>{stBtn}</h6></ControlBtn>
                    <ControlBtn styles={controls.Right}  ClickHangler={() => snakeHead.move === -1 ? setSnakeHead((prev) => ({...prev, move:-1})) : setSnakeHead((prev) => ({...prev, move:1}))} ><Right /></ControlBtn>
                    <ControlBtn styles={controls.Down}  ClickHangler={() => snakeHead.move === 2 ? setSnakeHead((prev) => ({...prev, move:2})) : setSnakeHead((prev) => ({...prev, move:-2}))} ><Down /></ControlBtn>
               </div>
          </div>
     )
}

export default Body


/*
 <div className='controls' style={{width:controls.width}} >
                    <ControlBtn styles={{left:"-12.5%", top:"35%"}} ClickHangler={() => snakeHead.move === 1 ? setSnakeHead((prev) => ({...prev, move:1})) : setSnakeHead((prev) => ({...prev, move:-1}))} ><Left /></ControlBtn>
                    <ControlBtn styles={{left:"35%", top:"-12.5%"}}  ClickHangler={() => snakeHead.move === -2 ? setSnakeHead((prev) => ({...prev, move:-2})) : setSnakeHead((prev) => ({...prev, move:2}))} ><Up /></ControlBtn>
                    <ControlBtn styles={{width:"40%"}}   ClickHangler={GameControl} Ref={btnRef} ><h6 onMouseOver={changeWhite} ref={title}>{stBtn}</h6></ControlBtn>
                    <ControlBtn styles={{right:"-12.5%", top:"35%"}}  ClickHangler={() => snakeHead.move === -1 ? setSnakeHead((prev) => ({...prev, move:-1})) : setSnakeHead((prev) => ({...prev, move:1}))} ><Right /></ControlBtn>
                    <ControlBtn styles={{left:"35%", bottom:"-12.5%"}}  ClickHangler={() => snakeHead.move === 2 ? setSnakeHead((prev) => ({...prev, move:2})) : setSnakeHead((prev) => ({...prev, move:-2}))} ><Down /></ControlBtn>
               </div>
*/
