import { useEffect, useState } from "react";
import { nowToHHMM } from "../../services/date-service";
import { Txt } from "../Txt/Txt";
import { S } from "./Clock.style";

export function Clock(){
    const [time, setTime] = useState(nowToHHMM());
    useEffect(()=>{
       const interval = setInterval(()=>{
           setTime(nowToHHMM());
        },1000);

        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
    <>
        <Txt style={S.time}>{nowToHHMM()}</Txt>
    </>
    );
}