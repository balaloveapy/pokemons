'use client'
import style from './Node.module.css'
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { pokemons } from './type'
export default function page(){
  const [navigation,setnavigation]= useState(1)
  const [option,setoption]=useState<number>(0)
  const [open,setopen]= useState<boolean>(false)
  const [next,setnext]=useState<pokemons[]>([])
  const [novos,setnovo]=useState<number>(100)
  const [number,setnumber]=useState<number>(1)
  const clickbait = useRef()
  
 async function pokemon(){
  var novo=[]
  for(let i=number;i<=novos;i++)novo.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    var req = await axios.all(novo.map(a=>axios.get(a))).then((b)=>setnext(b))
  }
  useEffect(()=>{
    pokemon()
    console.log(clickbait.current.offsetHeight)
  },[number,novos])
  const up=(b:string)=>{
    if(b==='+'){
      setnavigation((a)=>a+1)
      setnovo(a=>a+28)
      setnumber((a)=>a+28)
    }
    if(number>1){
    if(b==='-'){
        setnavigation((a)=>a-1)
        setnovo(a=>a-28)
        setnumber((a)=>a-28)
      }
    } 
  }
  function info(index:number){
    setoption(index)
    setopen(true)
  }
  return(
    <div ref={clickbait} className="flex flex-col items-center">
      {open && 
      <div  style={{height:clickbait.current.offsetHeight+'px'}} className={style.fullscreen}>
          <div className={style.ola}>
            <button className={style.button} onClick={()=>setopen(false)}>X</button>
            <img className={style.img2} src={next[option].data.sprites.front_default} alt="" />
            <p>{next[option].data.name}</p>
        </div>
      </div>
        
      }
      <div className={style.grid}>
        {next.map((a,index)=>(
          <div onClick={()=>info(index)} key={index} className={style.img}>
            <img className='transition' src={a.data.sprites.front_default} alt={a.data.name} />
            <p>{a.data.name}</p>
          </div>))}
      </div>
      <div className="flex justify-center gap-8">
        <button onClick={()=>up('-')} className="rounded-md p-2 bg-black text-white">{navigation}</button>
        <button onClick={()=>up('+')} className="rounded-md p-2 bg-black text-white">{navigation+1}</button>
      </div>
    </div>
  )
}