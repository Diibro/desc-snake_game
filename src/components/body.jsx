import {useState, useRef, useEffect} from 'react'
import {AiOutlineArrowDown as Down, AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right, AiOutlineArrowUp as Up} from 'react-icons/ai'
import {GiDragonHead} from 'react-icons/gi'

const ControlBtn = ({children, ClickHangler, Ref}) =>{

     return(
          <button ref={Ref} onClick={ClickHangler} className='control-btn'>
               {children}
          </button>
     )
}

//const [temp, setTemp] = useState(0)

const Dot = ({Ref, styles}) => {
     return(
          <div ref={Ref} style={styles} className='dotBody'>

          </div>
     )
}

const Body = () => {

     //states
     const [stBtn, setStBtn] = useState("Start") 
     const [move, setMove] = useState(0)
     //const [temp, setTemp] = useState(0)
     const [lastMove, setLastMove] = useState(0) 
     const lastMoveRef = useRef(null)

     const [pos, setPos] = useState({
          x: 50, y: 5, w: 10, d: 0
      })


     

     const [snakeHead, setSnakeHead] = useState({
          pos: {x: 50, y: 5 },
          move: 0,
          count: 0,
          temp: 0
     })

     const [dotPos, setDotPos] = useState({
          x: snakeHead.pos.x + 6, y: snakeHead.pos.y + 1.8, d: 0
     })

     /*const [snakeBody, setSnakeBody] = useState([{
          x:snakeHead.pos.x + 5, 
          y:snakeHead.pos.y + 1.8
     }])
*/

     
     //Refs
     const moveRef = useRef(null)
     const dotRef = useRef(null)
     const btnRef = useRef(null)
     const title = useRef(null)
     const bodyRef = useRef(null)
     const dot = useRef(null)
     const posRef = useRef(pos)

    

      

      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
     }

     
     useEffect( () => {
          const moveSnake =  async () =>{
               await sleep(1000)
               
               if(snakeHead.move === 0){
                    return
               }else if(snakeHead.move === 1){
                   // await sleep(1000)
                   if(lastMoveRef.current === 2){
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x - 5, y: snakeHead.pos.y + 5}))
                   }
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x + 5, y: snakeHead.pos.y + 1.8}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,x: snakeHead.pos.x + 1} }))
               }else if(snakeHead.move === -1){
                    //await sleep(1000)
                    setDotPos((prev) => ({...prev,x: snakeHead.pos.x + 5, y: snakeHead.pos.y + 1.8}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,x: snakeHead.pos.x - 1} }))
               }else if(snakeHead.move === 2){
                   // await sleep(1000)
                   setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y + 5}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,y: snakeHead.pos.y - 1, } }))
               }else if(snakeHead.move === -2){
                   // await sleep(1000)
                   setDotPos((prev) => ({...prev,x: snakeHead.pos.x, y: snakeHead.pos.y - 5}))
                    setSnakeHead((prev) => ({...prev, pos:{...prev.pos,y: snakeHead.pos.y + 1, } }))
               }

               
               
               //setSnakeHead((prev) => ({...prev, count: snakeHead.count + 1}))
          }
          moveSnake()
     } , [snakeHead]
     )
 

     

     const GameControl = () => {
          if(stBtn === "Continue"){
               //setMove(temp)
               setMove(pos.d)
               btnRef.current.style.background = '#aa6000'
               setStBtn("Stop")
          }
          if(stBtn === "Stop"){
              // setTemp(move)
              setPos((prev) => ({...prev, d:move}))
               setSnakeHead((prev) => ({...prev, move: 0}))
               btnRef.current.style.background = '#00aa47'
               setStBtn("Continue")
          }
          if(stBtn === "Start"){
               setSnakeHead((prev) => ({...prev, move: 1}))
               btnRef.current.style.background = '#aa6000'
               setStBtn("Stop")
          }
          
     }

     const changeWhite = () => {
          if(stBtn !== "Start"){
               title.current.style.color = "white"
          }
          
     }
   //dotRef.current.style.background = "blue"  
  return (
    <div className='body' ref={bodyRef}>
     <div className='screen' >
          <div className='snake_body'    id='snake-body' >
               <i ref={dotRef} style={{left: snakeHead.pos.x + "%", top: snakeHead.pos.y + "%",}} ><GiDragonHead /></i>
               <Dot Ref={dot} styles={{left: dotPos.x + "%", top: dotPos.y + "%"}} />
          </div>

          <div className='dotBody'> </div>
     </div>
     <div className='controls'>
         <ControlBtn ClickHangler={() => snakeHead.move === 1 ? setSnakeHead((prev) => ({...prev, move:1})) : setSnakeHead((prev) => ({...prev, move:-1}))} ><Left /></ControlBtn>
         <ControlBtn ClickHangler={() => snakeHead.move === -2 ? setSnakeHead((prev) => ({...prev, move:-2})) : setSnakeHead((prev) => ({...prev, move:2}))} ><Up /></ControlBtn>
         <ControlBtn ClickHangler={GameControl} Ref={btnRef} ><h6 onMouseOver={changeWhite} ref={title}>{stBtn}</h6></ControlBtn>
         <ControlBtn ClickHangler={() => snakeHead.move === -1 ? setSnakeHead((prev) => ({...prev, move:-1})) : setSnakeHead((prev) => ({...prev, move:1}))} ><Right /></ControlBtn>
         <ControlBtn ClickHangler={() => snakeHead.move === 2 ? setSnakeHead((prev) => ({...prev, move:2})) : setSnakeHead((prev) => ({...prev, move:-2}))} ><Down /></ControlBtn>
     </div>
    </div>
  )
}

export default Body

/**
 * 
     useEffect( () => {
          moveRef.current = move;
          if(bodyRef.current){
               
               bodyRef.current.addEventListener("keydown", (event) => {
                    console.log(event.key)
                    if(event.key === "ArrowUp"){
                         move === -2 ? setMove(-2) : setMove(2)
                    }else if(event.key === "ArrowDown"){
                         move === 2 ? setMove(2) : setMove(-2)
                    } else if(event.key === "ArrowRight"){
                         move === -1 ? setMove(-1) : setMove(1)
                    }else if(event.key === "ArrowLeft"){
                         move === 1 ? setMove(1) : setMove(-1)
                    }//else if(event.key === " "){
                    //    GameControl()
                   // }
               })
          }
          const moveSnake = async () =>{
               if(move === 0){
                    return
               }
               if(moveRef.current === 1){
                    // moving right
                    

                    //setTemp(1)
                    setPos((prev) => ({...prev, d:1}))
                    setStBtn("Stop")
                    for(let i = pos.x; i <= 90 && moveRef.current === 1; i++){
                         await sleep(300)
                         if(i === 90){
                              dotRef.current.style.background = "red"
                              dotRef.current.style.border = "none"
                         }
                         setDotPos(posRef.current)
                         setPos((prev) => ({...prev, x: i}))
                         posRef.current = pos 
                         setDotPos((prev) => ({...prev, x: i + 6}))
                    }
               }else if(moveRef.current === -1){
                    // moving left

                    //setTemp(-1)
                    setPos((prev) => ({...prev, d:-1}))
                    setStBtn("Stop")
                    for(let i = pos.x; i >= 2 && moveRef.current === -1; i--){
                         await sleep(300)
                         if(i === 2){
                              dotRef.current.style.background = "red"
                              dotRef.current.style.border = "none"
                         }
                         setDotPos(posRef.current)
                         setPos((prev) => ({...prev, x: i}))
                         posRef.current = pos
                         setDotPos((prev) => ({...prev, x: i + 6}))
                         
                    }
               }else if(moveRef.current === -2){
                    //moving down

                    //setTemp(-2)
                    setPos((prev) => ({...prev, d:-2}))
                    setStBtn("Stop")
                    for(let i = pos.y; i <= 90 && moveRef.current === -2; i++){
                         await sleep(300)
                         if(i === 90){
                              dotRef.current.style.background = "red"
                              dotRef.current.style.border = "none"
                         }
                         setDotPos(posRef.current)
                         setPos((prev) => ({...prev, y: i}))
                         posRef.current = pos
                         setDotPos((prev) => ({...prev, y: i + 1.8}))
                    }
               }else if(moveRef.current === 2){
                    
                    //setTemp(2)
                    setPos((prev) => ({...prev, d:2}))
                    setStBtn("Stop")
                    // moving up
                    for(let i = pos.y; i >= 2 && moveRef.current === 2; i--){
                         await sleep(300)
                         if(i === 2){
                              dotRef.current.style.background = "red"
                              dotRef.current.style.border = "none"
                         }
                         setDotPos(posRef.current)
                         setPos((prev) => ({...prev, y: i}))
                         posRef.current = pos
                         setDotPos((prev) => ({...prev, y: i + 1.8}))
                    }
               }
             
          }
          moveSnake();
         

         
     }, [move])



     const GameControl = () => {
          if(stBtn === "Continue"){
               //setMove(temp)
               setMove(pos.d)
               btnRef.current.style.background = '#aa6000'
               setStBtn("Stop")
          }
          if(stBtn === "Stop"){
              // setTemp(move)
              setPos((prev) => ({...prev, d:move}))
               setMove(0)
               btnRef.current.style.background = '#00aa47'
               setStBtn("Continue")
          }
          if(stBtn === "Start"){
               setMove(-1)
               btnRef.current.style.background = '#aa6000'
               setStBtn("Stop")
          }
          
     }


     <div className='body' ref={bodyRef}>
     <div className='screen' >
          <div className='snake_body'    id='snake-body' >
               <i ref={dotRef} style={{left: pos.x + "%", top: pos.y + "%",}} ><GiDragonHead /></i>
               <Dot Ref={dot} styles={{left: dotPos.x + "%", top: dotPos.y + "%"}} />
          </div>

          <div className='dotBody'> </div>
     </div>
     <div className='controls'>
         <ControlBtn ClickHangler={() => move === 1 ? setMove(1) : setMove(-1)} ><Left /></ControlBtn>
         <ControlBtn ClickHangler={() => move === -2 ? setMove(-2) : setMove(2)} ><Up /></ControlBtn>
         <ControlBtn ClickHangler={GameControl} Ref={btnRef} ><h6 onMouseOver={changeWhite} ref={title}>{stBtn}</h6></ControlBtn>
         <ControlBtn ClickHangler={() => move === -1 ? setMove(-1) : setMove(1)} ><Right /></ControlBtn>
         <ControlBtn ClickHangler={() => move === 2 ? setMove(2) : setMove(-2)} ><Down /></ControlBtn>
     </div>
    </div>

    
 * 
 */