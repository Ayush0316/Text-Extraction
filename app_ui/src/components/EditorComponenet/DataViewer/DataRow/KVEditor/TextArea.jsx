import { useEffect, useRef, useState } from "react";

const TextArea = ({ value, css, onChange}) => {
  const tRef = useRef(null);
  const [vv, setVV] = useState(value);

  useEffect(() => {
    if(tRef.current){
        tRef.current.style.height = "0px";
        const scrollHeight = tRef.current.scrollHeight;
        tRef.current.style.height = scrollHeight + "px";
    }
  }, [vv]);

  return (
    <textarea style={{padding:"10px", ...css}} ref={tRef} onChange={(e) => {
      console.log(e.target.value)
      onChange(e.target.value)
    }} value={value}></textarea>
  );
};


export default TextArea;