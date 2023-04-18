import {useState, useRef, useEffect} from 'react'
import {AiOutlineArrowDown as Down, AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right, AiOutlineArrowUp as Up} from 'react-icons/ai'
import {GiDragonHead} from 'react-icons/gi'

const ControlBtn = ({children, ClickHangler}) =>{

     

     return(
          <button onClick={ClickHangler} className='control-btn'>
               {children}
          </button>
     )
}

const Dot = () => {
     return(
          <div className='dotBody'>

          </div>
     )
}

const Body = () => {
     const dotRef = useRef(null)
     const [stBtn, setStBtn] = useState("Start") 
     const [move, setMove] = useState(-1)
     const moveRef = useRef(null)

     const [pos, setPos] = useState({
          x: 0, y: 0,
      })

      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
     }

     useEffect( () => {
          moveRef.current = move;
          const moveSnake = async () =>{
               if(move === 0){
                    return
               }
               if(moveRef.current === 1){
                    for(let i = pos.x; i <= 100 && moveRef.current === 1; i++){
                         await sleep(1000)
                         if(i === 100){
                              i = 0;
                         }
                         setPos((prev) => ({...prev, x: i}))
                    }
               }else if(moveRef.current === -1){
                    for(let i = pos.x; i >= -10 && moveRef.current === -1; i--){
                         await sleep(1000)
                         if(i === -10){
                              i = 100;
                         }
                         setPos((prev) => ({...prev, x: i}))
                    }
               }else if(moveRef.current === -2){
                    for(let i = pos.y; i <= 100 && moveRef.current === -2; i++){
                         await sleep(1000)
                         if(i === 100){
                              i = 0;
                         }
                         setPos((prev) => ({...prev, y: i}))
                    }
               }else if(moveRef.current === 2){
                    // move 
                    for(let i = pos.y; i >= -10 && moveRef.current === 2; i--){
                         await sleep(1000)
                         if(i === -10){
                              i = 100;
                         }
                         setPos((prev) => ({...prev, y: i}))
                    }
               }
             
          }
          moveSnake();
     }, [move])

     
 


     const GameControl = () => {
          if(stBtn === "Stop"){
               setMove(0)
               setStBtn("Start")
          }
          if(stBtn === "Start"){
               setStBtn("Stop")
          }
     }

    

     

     

     const MoveDown =() =>{
     }

     
  return (
    <div className='body'>
     <div className='screen' >
          <div className='snake_body' style={{left: pos.x + "%", top: pos.y + "%"}} ref={dotRef} id='snake-body' >
               <i><GiDragonHead /></i>
               <Dot />
          </div>

          <div className='dotBody'> </div>
     </div>
     <div className='controls'>
         <ControlBtn ClickHangler={() => move === 1 ? setMove(1) : setMove(-1)} ><Left /></ControlBtn>
         <ControlBtn ClickHangler={() => move === -2 ? setMove(-2) : setMove(2)} ><Up /></ControlBtn>
         <ControlBtn ClickHangler={GameControl}><h6>{stBtn}</h6></ControlBtn>
         <ControlBtn ClickHangler={() => move === -1 ? setMove(-1) : setMove(1)} ><Right /></ControlBtn>
         <ControlBtn ClickHangler={() => move === 2 ? setMove(2) : setMove(-2)} ><Down /></ControlBtn>
     </div>
    </div>
  )
}

export default Body