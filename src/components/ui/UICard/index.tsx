export function CardHeader(props) {
  return(
    <div className='px-3 py-3 w-full border-b border-base-100'>
      {props.children}
    </div>
  )
}

export function CardContent(props) {
  return(
    <div 
      className='px-3 py-3 w-full h-full overflow-y-scroll'
      style={{
        scrollbarWidth: "none",
      }}>
      {props.children}
    </div>
  )
}

export function Card(props) {
  return (
    <div 
      className='px-3 bg-base-300 rounded-md h-full w-full overflow-hidden shadow-md'
    >
      {props.children}
    </div>
  )
}
