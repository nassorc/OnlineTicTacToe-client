import useEvents from "../../hooks/useSocketManager";
export default function TryNew() {
  const {handleEmitEvent} = useEvents();
  return (
    <div>
      <h1>Testing new hook</h1>
      <button onClick={() => {
        handleEmitEvent("nothing", "data");
      }}>emit event</button>
    </div>
  )
}
