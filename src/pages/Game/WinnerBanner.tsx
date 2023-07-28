import { Link, useNavigate } from "react-router-dom";

interface PropsType {
  playerName: string
}
export default function WinnerBanner(props: PropsType) {
  const navigate = useNavigate();
  const { playerName } = props;
  return (
    <div className="my-8 flex flex-col justify-center">
      <div>
        <span>🎉</span>
        <span>WINNER:</span>
        <span>{playerName}</span>
        <span>🎉</span>
      </div>
      <button onClick={() => {
        navigate("/");
      }}>
          Home
      </button>
    </div>
  )
}
